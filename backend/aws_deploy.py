import os
from dotenv import load_dotenv
load_dotenv()



# Django variables
DEBUG=os.getenv('DEBUG')
DJANGO_SECRET_KEY=os.getenv('SECRET_KEY') #should be new each time
DJANGO_ALLOWED_HOST=os.getenv('ALLOWD_HOST') # allowed host
EMAIL_HOST_PASSWORD=os.getenv('EMAIL_HOST_PASSWORD') #password for email password reset
EMAIL_HOST=os.getenv('EMAIL_HOST')
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')

#aws variables
ENV_NAME = 'portfolio-app'
RDS_TYPE = 'db.t3.micro'

# eb cli command see docs : https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html
command = ''
command = 'eb create ' + ENV_NAME +  ' -db.engine postgres -db.i ' + RDS_TYPE +' --envvars DJANGO_SECRET_KEY=' +\
DJANGO_SECRET_KEY + ',DJANGO_ALLOWED_HOST=' + DJANGO_ALLOWED_HOST + ',EMAIL_HOST_PASSWORD=' + EMAIL_HOST_PASSWORD +\
',DEBUG=' + DEBUG + ',EMAIL_HOST=' + EMAIL_HOST + ',EMAIL_HOST_USER=' + EMAIL_HOST_USER



os.system(command)