import requests
import json
from bs4 import BeautifulSoup

URL = "https://catalog.middlebury.edu/archive/MCUG/2021-2022/MCUG-2021-2022_latest.html"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(id="body")

courses = results.find_all("article", class_="course")

id_generator = 0 

data = []

for course in courses:
    title =  course.find("h3").text 
    dept  = title[:4].strip()
    dept = dept.strip()
    if len(dept)==3:
        class_name = title[9:title.index("(")]
    else:
        class_name = title[10:title.index("(")]
    class_num = title[5:9]
    professors_list = course.find (attrs = {"class":"course_instructors"}).text
    if (len(professors_list)>0):
        professors_list = professors_list[professors_list.index("(")+1:professors_list.index(")")]
    
    #parsing for multiple professors
    if (professors_list.startswith("Fall 2021")):
        new = professors_list.replace("Fall 2021: ", "")
        new = new.replace(";", ",")
        new = new.replace("Spring 2022: ", "")
        prof_names = new.split(",")
    else:
        prof_names = professors_list.split(",")
     
    #for i in professors_list:
        #if (i.startswith("Fall 2021")):
            
          #ind = i.find(":") + 2
          #if (i.find(",") != -1):
              #lInd = i.find(",")
          #lInd = i.find(";")
          #prof_names.append(i[ind:lInd])
          #ind2 = i.find(":", lInd) + 2
          #prof_names.append(i[ind2:])
        #else:
        #professor.append(i)
    profs = []

    for prof_name in prof_names:
        profs.append({"prof_name":prof_name, "satisfaction": [],
        "difficulty": [],
        "interest": [],
        "time_commitment": []})

    course_desc = course.find(attrs = {"class":"course_description"}).text

    class_obj = {"class_name": class_name,
    "dept": dept,
    "class_num": class_num,
    "course_desc": course_desc,
    "profs": profs,
    "id": id_generator}
    
    data.append (class_obj)

    id_generator+=1

with open('./data/seed.json', 'w') as outfile:
    json.dump(data, outfile)