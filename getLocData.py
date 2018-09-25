import json
import time
import csv
from csv import writer
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import pprint
import xlrd
from pyfiglet import Figlet

f = Figlet(font='slant')
print(f.renderText('Google Review Scraper'))
print('\n' * 3)
print('Welcome to Google Review Scraper')
print('by jim mcbrayer for #growwithgoogle')
print('\n' * 2)


def get_locations():

        options = webdriver.ChromeOptions()
        options.add_argument("--start-maximized")
        options.add_argument('headless')
        options.add_argument('window-size=1920x1080')
        driver = webdriver.Chrome(chrome_options=options)
        
        locs_result_file = 'parks20171024.csv'
        park_file = open(locs_result_file)
        park_reader = csv.reader(park_file, delimiter=",")
        park_headers = next(park_reader)[1:]

        data = []
                     
        for i, row in enumerate(park_reader): 
            
            reviews = []
            try: 
                if(row[0] == ''):
                    print('No key, moving on')            
                    continue

                driver.get('https://www.google.com')
                driver.execute_script(f'document.getElementsByClassName("gLFyf gsfi")[0].value = "{row[2]} {row[3]} {row[4]}"')
                page = driver.find_element_by_xpath(f'//*[@id="tsf"]/div[2]/div/div[3]/center/input[1]').click()
                time.sleep(1)
                rating = driver.find_element_by_class_name('slp')
                reviews_elements = driver.find_elements_by_class_name('b4vunb')
                
                for r in reviews_elements: 
                    review = r.text
                    reviews.append(review)
                
                data.append(dict(name=row[2], url=row[7], address=row[3], lat=row[1], lng=row[0], reviews=reviews, stars=rating.text))          

                print(data)         
                                
            except Exception as e:
                print(e)
                continue
            
        with open('locations.json', 'a+', encoding='utf-8') as outfile:
                outfile.write(json.dumps(data, sort_keys = True, ensure_ascii=False, indent= 4))   
                outfile.close
       
        park_file.close()

run_main = input('Run Google Scrape? This will take about 30 minutes...')
if (run_main == 'Y' or run_main == 'y'):	
    	get_locations()
else:
    	print('Canceled')