# Grouper App
Web application for coordinating and joining group purchases.

Developed by:
- Darius Yip
- Dennis Ang
- Liu Yue
- Nant Arunyawongsakorn

## React Front End
Set up to run on AWS EC2 at `http://ec2-52-203-124-19.compute-1.amazonaws.com:3000/`

Please notify Nant to start the server if testing is required.

### Steps to run on local server:

Requirements:
- Node version 19.7.0
- npm version 9.5.0

Navigate to frontend folder: `cd frontend`

Install required packages: `npm install`

Start the server: `npm start`

## Django Back End
(Using AWS Elastic Beanstalk console as cannot be done via CLI for AWS Learner Environment)

Currently running on AWS ELB at `http://Gbbackendserver-env.eba-farf3wjj.us-east-1.elasticbeanstalk.com`

<ol>
<li>Navigate to the root directory of the django backend application - 'cd ./gb_backend_ebs'.</li>
<li>Prepare the zip file to be uploaded onto AWS Elastic bean stalk by running - 'zip ../gb_backend_ebs.zip -r * .[^.]*'.</li>
<li>Head over to AWS Elasticbean Stalk, setup necessary environent and upload zip file from step 2. Note to only use x84 based processors</li>
</ol>

## AWS Lambda
<ol>
<li>Navigate to the root directory of the lambda function directory - 'cd ./lambda_close_listings'</li>
<li>Navigate into the dependencies/packages directory - 'cd ./.package'</li>
<li>Prepare the zip file to be uploaded by zipping dependencies 'zip -r ../gb_lambda_close.zip .'</li>
<li>Navigate back to root directory of the lambda function directory - 'cd ..'</li>
<li>Zip the lambda_function.py file into the zip package - 'zip -r gb_lambda_close.zip lambda_function.py'</li>
<li>Head over to AWS lambda, setup lambda function and upload zip file created.</li>
</ol>