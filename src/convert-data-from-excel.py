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

columns = [c for c in column_mapping.keys() if column_mapping[c] != None]
# Rename columns.
df = df[columns].rename(columns=column_mapping)
# Drop supplemental rows that include information prof. Naylor added that will break the website.
df.drop([i for i in range(208,221)], inplace=True)
# Set index to personId
df = df.set_index("personId")

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
 nan: "Not at Rose Hall in 1832"}

df['dutyCategory'] = df['duties'].apply(lambda x: duties_dictionary[x])

# Parse ages
def numTest(value):
  return value.replace(".0", "").isnumeric()

# Parse arrival year
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

# Parse birth year
def birthYearHunter(row):
  if row["arrivalYear"] == 1817.0:
    return 1817 - row["age1817List"]
  else:
    return row["arrivalYear"]


df["arrivalYear"] = df.apply(arrivalYearHunter, axis=1)
df["birthYear"] = df.apply(birthYearHunter, axis=1)
df["exitYear"] = 1833.0

manual_matrix = {
    "P4": {"arrivalYear": 1820, "exitYear": 1821},
    "P5": {"arrivalYear": 1829, "exitYear": 1832},
    "P6": {"exitYear": 1822},
    "P8": {"exitYear": 1818},
    "P9": {"exitYear": 1826},
    "P10": {"arrivalYear": 0, "exitYear": 1819},
    "P15": {"exitYear": 1818},
    "P17": {"exitYear": 1826},
    "P18": {"exitYear": 1828},
    "P19": {"exitYear": 1831},
    "P20": {"exitYear": 1826},
    "P21": {"exitYear": 1818},
    "P22": {"exitYear": 1823},
    "P24": {"exitYear": 1827},
    "P25": {"exitYear": 1830},
    "P28": {"exitYear": 1827},
    "P29": {"exitYear": 1819},
    "P33": {"exitYear": 1829},
    "P34": {"arrivalYear": 1826, "exitYear": 1828},
    "P37": {"exitYear": 1830},
    "P38": {"arrivalYear": 0, "exitYear": 1817.5},
    "P40": {"arrivalYear": 0, "exitYear": 0},
    "P43": {"exitYear": 1826},
    "P44": {"arrivalYear": 1826},
    "P46": {"arrivalYear": 1820, "exitYear": 1821},
    "P47": {"arrivalYear": 1829},
    "P49": {"exitYear": 1824},
    "P50": {"exitYear": 1819},
    "P52": {"exitYear": 1818},
    "P53": {"exitYear": 1828},
    "P54": {"exitYear": 1824},
    "P55": {"exitYear": 1829},
    "P56": {"exitYear": 1828},
    "P57": {"exitYear": 1821},
    "P59": {"arrivalYear": 1827, "exitYear": 1829},
    "P61": {"arrivalYear": 1828, "exitYear": 1829},
    "P62": {"exitYear": 1821},
    "P63": {"arrivalYear": 1818, "exitYear": 1820},
    "P64": {"exitYear": 1820},
    "P65": {"exitYear": 1820},
    "P66": {"arrivalYear": 1817},
    "P67": {"arrivalYear": 1832},
    "P68": {"exitYear": 1827},
    "P71": {"exitYear": 1819},
    "P72": {"exitYear": 1817.5},
    "P74": {"exitYear": 1819},
    "P75": {"exitYear": 1824},
    "P76": {"exitYear": 1828},
    "P78": {"exitYear": 1828},
    "P82": {"exitYear": 1824},
    "P83": {"exitYear": 1824},
    "P86": {"exitYear": 1819},
    "P88": {"arrivalYear": 1820, "exitYear": 1827},
    "P90": {"arrivalYear": 1832},
    "P93": {"arrivalYear": 1824, "exitYear": 1824},
    "P94": {"exitYear": 1817.5},
    "P96": {"exitYear": 1823},
    "P99": {"arrivalYear": 1821, "exitYear": 1822},
    "P100": {"exitYear": 1825},
    "P102": {"exitYear": 1819},
    "P105": {"exitYear": 1827},
    "P106": {"exitYear": 1826},
    "P113": {"exitYear": 1829},
    "P115": {"arrivalYear": 1823, "exitYear": 1829},
    "P119": {"arrivalYear": 1822, "exitYear": 1823},
    "P122": {"arrivalYear": 1829, "exitYear": 1829},
    "P125": {"exitYear": 1819},
    "P129": {"arrivalYear": 1817},
    "P130": {"exitYear": 1818},
    "P136": {"exitYear": 1823},
    "P137": {"exitYear": 1820},
    "P138": {"exitYear": 1826},
    "P140": {"exitYear": 1826},
    "P141": {"arrivalYear": 1820},
    "P142": {"exitYear": 1821},
    "P144": {"arrivalYear": 1820},
    "P146": {"exitYear": 1825},
    "P148": {"exitYear": 1820},
    "P149": {"exitYear": 1828},
    "P155": {"exitYear": 1821},
    "P157": {"exitYear": 1821},
    "P162": {"arrivalYear": 1826, "exitYear": 1827},
    "P163": {"exitYear": 1822},
    "P164": {"exitYear": 1822},
    "P165": {"arrivalYear": 1825},
    "P166": {"exitYear": 1831},
    "P167": {"arrivalYear": 1824, "exitYear": 1826},
    "P168": {"arrivalYear": 1826, "exitYear": 1826},
    "P170": {"arrivalYear": 0},
    "P171": {"arrivalYear": 1828},
    "P176": {"exitYear": 1822},
    "P177": {"exitYear": 1824},
    "P181": {"exitYear": 1832},
    "P182": {"exitYear": 1822},
    "P185": {"exitYear": 1818},
    "P186": {"exitYear": 1820},
    "P187": {"arrivalYear": 1820, "exitYear": 1822},
    "P189": {"exitYear": 1822},
    "P190": {"exitYear": 1826},
    "P191": {"arrivalYear": 1820, "exitYear": 1823},
    "P192": {"exitYear": 1822},
    "P193": {"exitYear": 1828},
    "P194": {"arrivalYear": 1829, "exitYear": 1832},
    "P195": {"exitYear": 1827},
    "P200": {"exitYear": 1824},
    "P201": {"exitYear": 1829},
    "P202": {"arrivalYear": 1826},
    "P203": {"arrivalYear": 1831, "exitYear": 1831}
}

def setArrivalYearManually(row):
  if row.name in manual_matrix and "arrivalYear" in manual_matrix[row.name]:
    return manual_matrix[row.name]["arrivalYear"]
  else:
    return row["arrivalYear"]

def setExitYearManually(row):
  if row.name in manual_matrix and "exitYear" in manual_matrix[row.name]:
      return manual_matrix[row.name]["exitYear"]
  else:
    return row["exitYear"]

df["arrivalYear"] = df.apply(setArrivalYearManually, axis=1)
df["exitYear"] = df.apply(setExitYearManually, axis=1)
df["birthYear"] = df.apply(birthYearHunter, axis=1)

df["personSlug"] = df.apply(lambda row: f"{row['name'].replace(' ', '-')}-{row.name}", axis=1)

# Cell 8
# import time
# now = time.strftime("%Y-%m-%d-%H:%M")
# df.to_csv(f"{now}-data.csv")

# Cell 9
trimmed = df[["name", "country", "colour", "gender", "motherId", "displayName", "profile", "dutyCategory", "arrivalYear", "birthYear", "exitYear", "personSlug"]]

json_string = trimmed.reset_index().to_json(orient="records", indent=2)

output = "export default " + json_string + ";"
f = open("app/data/people.js", "w")
f.write(output)
f.close()
