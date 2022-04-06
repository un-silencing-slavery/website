# -*- coding: utf-8 -*-
import pandas as pd
import re
import numpy as np

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

json_string = df.to_json(orient="records")

output = "export default " + json_string + ";"
f = open("app/data.sortedData().js", "w")
f.write(output)
f.close()
