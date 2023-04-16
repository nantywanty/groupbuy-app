import json

import haversine as hs
import numpy as np
from ortools.constraint_solver import pywrapcp, routing_enums_pb2

def read_json_from_file(file_name):
    with open(file_name, "r") as fd:
        data = fd.read()
    return json.loads(data)

def write_json_to_file(data, file_name):
    with open(file_name, "w") as fd:
        fd.write(json.dumps(data, indent=4))

def get_all_locations(loc_info):
    # get depot + customer locations as a list
    locations = []
    depot = loc_info["Depot"]
    customer_locations = loc_info["Customer Locations"]
    locations.append(depot)
    for loc in customer_locations:
        locations.append(loc)
    return locations

def get_loc_coordinate(postcode_file, locations):
    """
    > get all locations coordinates
    
    args:
      - postcode_file: postcode json file
      - locations: list of all locations, index 0 is depot
    
    return: {"120416": (lat, lng)}
    """
    loc_to_coor_dict = {}
    for loc in locations:
        loc = loc.split()[0]
        if loc not in loc_to_coor_dict:
            loc_to_coor_dict[loc] = tuple()
        for postcode in postcode_file:
            if postcode['POSTAL'] == loc:
                loc_to_coor_dict[loc] = (float(postcode["LATITUDE"]), float(postcode["LONGITUDE"]))
    return loc_to_coor_dict

def get_distance_matrix(locations, loc_to_coor_dict):
    distance_matrix = []
    for i in range(len(locations)):
        distance_list = []
        for j in range(len(locations)):
            distance = round(
                hs.haversine(loc_to_coor_dict[locations[i].split()[0]], loc_to_coor_dict[locations[j].split()[0]]), 3
            )
            distance_list.append(distance)
        distance_matrix.append(distance_list)
    return distance_matrix

def get_time_matrix(distance_matrix, speed):
    time_matrix = (np.array(distance_matrix) * (3600 / speed)).astype(int)
    time_matrix = time_matrix.tolist()
    time_matrix
    return time_matrix

def get_time_windows(distance_matrix, hours):
    time_windows = []
    for i in range(len(distance_matrix)):
        time_windows.append((0, 3600 * hours))
    return time_windows

def create_data_model(time_matrix, time_windows, num_vehicles):
    data = {}
    data["time_matrix"] = time_matrix
    data["time_windows"] = time_windows
    data["num_vehicles"] = num_vehicles
    data["depot"] = 0
    return data

def print_solution(data, manager, routing, solution):
    """
    > Prints solution on console.
    
    Args:
      data: input data
      manager: routing index manager
      routing: routing model
      solution: output solution
    """
    print(f"Objective: {solution.ObjectiveValue()}")
    time_dimension = routing.GetDimensionOrDie("Time")
    total_time = 0
    for vehicle_id in range(data["num_vehicles"]):
        index = routing.Start(vehicle_id)
        plan_output = "Route for vehicle {}:\n".format(vehicle_id)
        while not routing.IsEnd(index):
            time_var = time_dimension.CumulVar(index)
            plan_output += "{0} Time({1},{2}) -> ".format(
                manager.IndexToNode(index),
                solution.Min(time_var),
                solution.Max(time_var),
            )
            index = solution.Value(routing.NextVar(index))
        time_var = time_dimension.CumulVar(index)
        plan_output += "{0} Time({1},{2})\n".format(
            manager.IndexToNode(index), solution.Min(time_var), solution.Max(time_var)
        )
        plan_output += "Time of the route: {}second\n".format(solution.Min(time_var))
        print(plan_output)
        total_time += solution.Min(time_var)
    print("Total time of all routes: {}second".format(total_time))
    
def get_routes(solution, routing, manager):
    """Get vehicle routes from a solution and store them in an array."""
    # Get vehicle routes and store them in a two dimensional array whose
    # i,j entry is the jth location visited by vehicle i along its route.
    routes = []
    for route_nbr in range(routing.vehicles()):
        index = routing.Start(route_nbr)
        route = [manager.IndexToNode(index)]
        while not routing.IsEnd(index):
            index = solution.Value(routing.NextVar(index))
            route.append(manager.IndexToNode(index))
        routes.append(route)
    return routes

def get_cumul_data(solution, routing, dimension):
    """Get cumulative data from a dimension and store it in an array."""
    # Returns an array cumul_data whose i,j entry contains the minimum and
    # maximum of CumulVar for the dimension at the jth node on route :
    # - cumul_data[i][j][0] is the minimum.
    # - cumul_data[i][j][1] is the maximum.
    cumul_data = []
    for route_nbr in range(routing.vehicles()):
        route_data = []
        index = routing.Start(route_nbr)
        dim_var = dimension.CumulVar(index)
        route_data.append([solution.Min(dim_var), solution.Max(dim_var)])
        while not routing.IsEnd(index):
            index = solution.Value(routing.NextVar(index))
            dim_var = dimension.CumulVar(index)
            route_data.append([solution.Min(dim_var), solution.Max(dim_var)])
        cumul_data.append(route_data)
    return cumul_data

def get_idx_to_loc(locations):
    idx_to_loc = {}
    for idx, loc in enumerate(locations):
        idx_to_loc[idx] = loc
    return idx_to_loc

def get_output_dict(solution, routing, manager, time_dimension, idx_to_loc):
    output_routes = get_routes(solution, routing, manager)
    output_time_window = get_cumul_data(solution, routing, time_dimension)

    output_dict = {}
    for route_idx in range(len(output_routes)):
        vehicle = f"vehicle {route_idx + 1}"
        route = output_routes[route_idx]
        output_dict[vehicle] = []
        for i in range(len(route)):
            loc_idx = route[i]
            info = {"location_index": 0, "location": 0, "time window": 0}
            info["location_index"] = loc_idx
            info["location"] = idx_to_loc[loc_idx]
            info["time window"] = output_time_window[route_idx][i]
            output_dict[vehicle].append(info)

    return output_dict

def main():
    # parameters
    postcode_path = "singpostcode.json"
    instance_path = "instance_50cus.json"
    speed = 30  # km/h
    hours = 4  # hours
    vehicle = 1  # vehicles, for 50 customers, set above 1 

    # Instantiate the data problem.
    postcode_file = read_json_from_file(postcode_path)
    loc_info = read_json_from_file(instance_path)
    locations = get_all_locations(loc_info)
    loc_to_coor_dict = get_loc_coordinate(postcode_file, locations)
    distance_matrix = get_distance_matrix(locations, loc_to_coor_dict)
    time_matrix = get_time_matrix(distance_matrix, speed=speed)
    time_windows = get_time_windows(distance_matrix, hours=hours)
    data = create_data_model(time_matrix, time_windows, num_vehicles=vehicle)

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(
        len(data["time_matrix"]), data["num_vehicles"], data["depot"]
    )

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.
    def time_callback(from_index, to_index):
        """Returns the travel time between the two nodes."""
        # Convert from routing variable Index to time matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['time_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(time_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Time Windows constraint.
    time = 'Time'
    routing.AddDimension(
        transit_callback_index,
        1800,  # allow waiting time
        14400,  # maximum time per vehicle
        False,  # Don't force start cumul to zero.
        time)
    time_dimension = routing.GetDimensionOrDie(time)

    # Add time window constraints for each location except depot.
    for location_idx, time_window in enumerate(data['time_windows']):
        if location_idx == data['depot']:
            continue
        index = manager.NodeToIndex(location_idx)
        time_dimension.CumulVar(index).SetRange(time_window[0], time_window[1])

    # Add time window constraints for each vehicle start node.
    depot_idx = data['depot']
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        time_dimension.CumulVar(index).SetRange(
            data['time_windows'][depot_idx][0],
            data['time_windows'][depot_idx][1])

    # Instantiate route start and end times to produce feasible times.
    for i in range(data['num_vehicles']):
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.Start(i)))
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.End(i)))

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    # Print solution on console.
    if solution:
        print_solution(data, manager, routing, solution)

    # output solution
    idx_to_loc = get_idx_to_loc(locations)
    output_dict = get_output_dict(solution, routing, manager, time_dimension, idx_to_loc)
    write_json_to_file(output_dict, "output.json")

if __name__ == '__main__':
    main()
    