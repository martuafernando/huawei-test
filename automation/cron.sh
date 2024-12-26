DIR="/home/cron"
CURRENT_PATH=$(pwd)

# Add cron to get data at 8 am, 12 pm, and 3 pm
(crontab -l ; echo "0 8,12,15 * * * /usr/bin/python3 $CURRENT_PATH/automation/main.py -o $DIR") | crontab -

# Cron data clean if file is a month ago
(crontab -l ; echo "0 0 * * * /usr/bin/bash $CURRENT_PATH/automation/clean.sh $DIR") | crontab -