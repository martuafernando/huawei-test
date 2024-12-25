# Cron get data
0 8,12,15 * * * /usr/bin/python3 /home/ubuntu/huawei-test/automation/main.py -o /home/cron

# Cron data clean
0 0 * * * /usr/bin/bash /home/ubuntu/huawei-test/automation/clean.sh /home/cron