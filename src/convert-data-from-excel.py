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
    'id_for_digital_project': "personId",
    'name': "name",
    'other_versions_of_name_in_the_records': "otherNames",
    'christian_names_often_combined_with_surname_in_1832_list_in_old_st_james_book': "christianNames",
    'names_of_married_women_and_surnames_for_children_listed_in_1832_list_in_old_st_james_book': "familyNames",
    'country': "country",
    'colour': "colour",
    'gender': "gender",
    'age_on_1817_list': "age1817List",
    'familial_connections': "familyNotes",
    'mother': "mother",
    'id_of_mother': "motherId",
    'grandmother': "grandmother",
    'id_of_grandmother': "grandmotherId",
    'great grandmother': "greatgrandmother",
    'id_of_great_grandmother': "greatgrandmotherId",
    'my_additional_comments': "comments",
    '_rose_hall_journal_info': "journalInfo",
    'age_1817_registry': "age1817",
    'age_1820_registry': "age1820",
    'age_1823_registry': "age1823",
    'age_1826_registry': "age1826",
    'age_1829_registry': "age1829", 
    'age_1832_registry': "age1832",
    'age_1832_list_in_old_st_james_book': "age1832List",
    'primary_duties_and_positions_1832_list_in_old_st_james_book': "duties",
    'condition_1832_list_in_old_st_james_book': "condition",
    'disposition_1832_list_in_old_st_james_book': "disposition",
    'valuation_1832_list_in_old_st_james_book': "valuation",
    'display_name': "displayName",
    'individual_profile': "profile"
    }

new_columns = [
    "birthYear",
    "arrivalYear",
    "exitYear",
    "ageAtExit",
    "calcAgeDiff",
    "arrivalReason",
    "exitReason",
    "dob",
    "dod"
    ]

columns = [c for c in column_mapping.keys() if column_mapping[c] != None]
# Rename columns.
df = df[columns].rename(columns=column_mapping)
# Drop supplemental rows that include information prof. Naylor added that will break the website.
df.drop([i for i in range(208,221)], inplace=True)

# Convert these impossible age columns to strings.
for column in ["age1820", "age1823", "age1826", "age1829", "age1832", "age1832List"]:
  df[column] = pd.Series(df[column], dtype="string")
  df[column] = df[column].fillna("")

# Cell 3
for column in ["name", "country", "colour", "gender", "duties", "displayName", "profile"]:
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
def colourNan(x):
  if x == "Negro/Sambo?" or x == "Sambo/Mulatto?":
    return "Inconsistent"
  elif x is nan:
    return "Unknown"
  else:
    return x

df["colour"] = df["colour"].apply(colourNan)

# Cell 7
duties_dictionary = {'At Palmyra': "Craft Workers",
 'Attending Small Stock': "Livestock Workers",
 'Attending Young Children': "Domestic Workers",
 'Blacksmith': "Craft Workers",
 'Carpenter': "Craft Workers",
 'Cartman': "Craft Workers",
 'Cartman and Field': "Craft Workers",
 'Cattleboy': "Livestock Workers",
 'Cook for gang': "Domestic Workers",
 'Cooper': "Craft Workers",
 'Distiller': "Craft Workers",
 'Distiller and Field': "Craft Workers",
 'Domestic': "Domestic Workers",
 'Driveress': "Field Workers",
 'Field': "Field Workers",
 'Field and Grasscutter': "Field Workers",
 'Fisherman': "Craft Workers",
 'G.H. Attendant': "Domestic Workers",
 'Grasscutter': "Field Workers",
 'Head Boiler': "Craft Workers",
 'Head Carpenter': "Craft Workers",
 'Head Cartman': "Craft Workers",
 'Head Cooper': "Craft Workers",
 'Head Driver': "Craft Workers",
 'Head Penkeeper': "Livestock Workers",
 'Hogmeat Gang': "Field Workers",
 'Hospital': "Craft Workers",
 'Hospital Attendant and Midwife': "Craft Workers",
 'Mason': "Craft Workers",
 'Muleman': "Livestock Workers",
 'Not at Work': "“Not at Work”",
 "Overseer's Cook": "Domestic Workers",
 "Overseer's House": "Domestic Workers",
 'Second Driver': "Craft Workers",
 'Washerwoman': "Domestic Workers",
 'Watchman': "Craft Workers",
 'With Mrs. Palmer': "Domestic Workers",
 nan: "Unknown"}

df['duty_category'] = df['duties'].apply(lambda x: duties_dictionary[x])

# Parse ages
def numTest(value):
  return value.replace(".0", "").isnumeric()

# Parse birth year
def arrivalYearHunter(row):
  if row["age1817List"] > 0:
    return 1817
  elif numTest(row["age1820"]):
    return 1820 - float(row["age1820"])
  elif numTest(row["age1823"]):
    return 1823 - float(row["age1823"])
  elif numTest(row["age1826"]):
    return 1826 - float(row["age1826"])
  elif numTest(row["age1829"]):
    return 1829 - float(row["age1829"])
  elif numTest(row["age1832List"]):
    return 1832 - float(row["age1832List"])
  else:
    return 0


testdf = df
testdf["arrivalYear"] = testdf.apply(arrivalYearHunter, axis=1)

# Cell 8
import time
now = time.strftime("%Y-%m-%d-%H:%M")
df.to_csv(f"{now}-data.csv")

# Cell 9
json_string = df.to_json(orient="records")

output = "export default " + json_string + ";"
f = open("app/data/people.js", "w")
f.write(output)
f.close()
