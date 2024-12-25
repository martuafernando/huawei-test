from bs4 import BeautifulSoup
import requests
import csv
from datetime import datetime
import argparse
import os

def fetch_data(url):
  response = requests.get(url)

  if response.status_code == 200:
    return response.text
  else:
    print("Failed to retrieve data")
    return None

def format_data(text):
  soup = BeautifulSoup(text, "html.parser")
  result = []
  for item in soup.find_all(attrs={ "data-testid": lambda it: it and it.endswith('-card') }):
    tag = item.find(attrs={ "data-testid": lambda it: it and it.endswith('tag') })

    data = {
      "title": " ".join(map(str.strip, item.h2.get_text().splitlines())) if item.h2 else "",
      "description": " ".join(map(str.strip, item.p.get_text().splitlines())) if item.p else "",
      "tag": " ".join(map(str.strip, tag)) if tag else "",
    }

    result.append(data)

  return result 
  
def main():
  print("program running...")
  parser = argparse.ArgumentParser()
  parser.add_argument("-o", "--output", help="Output Directory")
  args = parser.parse_args()
  
  output_dir = args.output
  
  if not output_dir:
    print("Required flag -o or --output for output directory")
    return
  
  if not os.path.exists(output_dir):
    os.makedirs(output_dir)
  
  url = "https://www.bbc.com/news"
  html = fetch_data(url)
  data = format_data(html)
  
  new_file = output_dir + "/cron_" + datetime.now().strftime("%m%d%Y_%H.%M") + '.csv'

  with open(new_file, 'w', newline='') as outfile:
    writer = csv.writer(outfile)

    writer.writerow(data[0].keys())
    for row in data:
      writer.writerow(row.values())
  
    outfile.close()
  print("program completed")

if __name__ == "__main__":
  main()
