import requests
from bs4 import BeautifulSoup

URL = "https://catalog.middlebury.edu/archive/MCUG/2021-2022/MCUG-2021-2022_latest.html"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(id="body")

courses = results.find_all("article", class_="course")

id_generator = 0 

for course in courses:
    title =  course.find("h3").text 
    class_name = title[10:title.index("(")]
    class_num  = title[:4]
    professors_list = course.find (attrs = {"class":"course_instructors"}).text
    if (len(professors_list)>0):
        professors_list = professors_list[professors_list.index("(")+1:professors_list.index(")")]
    
    #parsing for multiple professors
    profs = professors_list.split (",")
    
    course_desc = course.find(attrs = {"class":"course_description"}).text

    class_obj = {"class_name": class_name,
    "class_num": class_num,
    "course_desc": course_desc,
    "profs": profs,
    "id": id_generator}
    
    print (class_obj)

    id_generator+=1


