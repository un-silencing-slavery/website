# -*- coding: utf-8 -*-
import pandas as pd
from numpy import nan

# Cell 2
file_url = "https://github.com/muziejus/rose-hall/blob/main/data/Comprehensive%20List%20of%20Enslaved%20People%20at%20Rose%20Hall%20Estate,%201817-1832.xlsx?raw=true"
# create a list of values prof. Naylor used as "N/A"
na_values = ["not_applicable", "not_specified", "--", " "]
# Read in Excel file.
df = pd.read_excel(
    file_url, 
    na_values=na_values)
# create a new list of column names that are easier to type
column_mapping = {
    'personId': "personId",
    'name': "name",
    'otherNames': "otherNames",
    'christianNames': "christianNames",
    'familyNames': "familyNames",
    'country': "country",
    'color': "color",
    'gender': "gender",
    'age1817List': "age1817List",
    'familyNotes': "familyNotes",
    'mother': "mother",
    'motherId': "motherId",
    'grandmother': "grandmother",
    'grandmotherId': "grandmotherId",
    'greatgrandmother': "greatgrandmother",
    'greatgrandmotherId': "greatgrandmotherId",
    'comments': "comments",
    'journalInfo': "journalInfo",
    'age1817': "age1817",
    'age1820': "age1820",
    'age1823': "age1823",
    'age1826': "age1826",
    'age1829': "age1829",
    'age1832': "age1832",
    'age1832List': "age1832List",
    'duties': "duties",
    'condition': "condition",
    'disposition': "disposition",
    'valuation': "valuation",
    'birthYear': "birthYear",
    'arrivalYear': "arrivalYear",
    'exitYear': "exitYear",
    'ageAtExit': "ageAtExit",
    'calcAgeDiff': "calcAgeDiff",
    'arrivalReason': "arrivalReason",
    'exitReason': "exitReason",
    'dob': "dob",
    'dod': "dod",
}
columns = [c for c in column_mapping.keys() if column_mapping[c] != None]
# Rename columns.
df = df[columns].rename(columns=column_mapping)
# Drop supplemental rows that include information prof. Naylor added that will break the website.
df.drop([i for i in range(208,221)], inplace=True)

# Cell 3
for column in ["name", "country", "color", "gender", "duties"]:
  df[column] = df[column].str.strip()

# Cell 4
def genderNan(x):
  if x is nan:
    return "Unknown"
  else:
    return x

df["gender"] = df["gender"].apply(genderNan)

# Cell 5
def countryNan(x):
  if x == "Creole/African?":
    return "Inconsistent"
  elif x is nan:
    return "Unknown"
  else:
    return x

df["country"] = df["country"].apply(countryNan)

# Cell 6
def colorNan(x):
  if x == "Negro/Sambo?" or x == "Sambo/Mulatto?":
    return "Inconsistent"
  elif x is nan:
    return "Unknown"
  else:
    return x

df["color"] = df["color"].apply(colorNan)

# Cell 7
duties_dictionary = {'At Palmyra': "Artisans and Specialists",
 'Attending Small Stock': "Animal Caretakers",
 'Attending Young Children': "Domestic Workers",
 'Blacksmith': "Artisans and Specialists",
 'Carpenter': "Artisans and Specialists",
 'Cartman': "Artisans and Specialists",
 'Cartman and Field': "Artisans and Specialists",
 'Cattleboy': "Animal Caretakers",
 'Cook for gang': "Domestic Workers",
 'Cooper': "Artisans and Specialists",
 'Distiller': "Artisans and Specialists",
 'Distiller and Field': "Artisans and Specialists",
 'Domestic': "Domestic Workers",
 'Driveress': "Field Workers",
 'Field': "Field Workers",
 'Field and Grasscutter': "Field Workers",
 'Fisherman': "Artisans and Specialists",
 'G.H. Attendant': "Domestic Workers",
 'Grasscutter': "Field Workers",
 'Head Boiler': "Artisans and Specialists",
 'Head Carpenter': "Artisans and Specialists",
 'Head Cartman': "Artisans and Specialists",
 'Head Cooper': "Artisans and Specialists",
 'Head Driver': "Artisans and Specialists",
 'Head Penkeeper': "Animal Caretakers",
 'Hogmeat Gang': "Field Workers",
 'Hospital': "Artisans and Specialists",
 'Hospital Attendant and Midwife': "Artisans and Specialists",
 'Mason': "Artisans and Specialists",
 'Muleman': "Animal Caretakers",
 'Not at Work': "“Not at Work”",
 "Overseer's Cook": "Domestic Workers",
 "Overseer's House": "Domestic Workers",
 'Second Driver': "Artisans and Specialists",
 'Washerwoman': "Domestic Workers",
 'Watchman': "Artisans and Specialists",
 'With Mrs. Palmer': "Domestic Workers",
 nan: "Unknown"}

df['duty_category'] = df['duties'].apply(lambda x: duties_dictionary[x])

# Cell 8
json_string = df.to_json(orient="records")

output = "export default " + json_string + ";"
f = open("app/data/people.js", "w")
f.write(output)
f.close()
