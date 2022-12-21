import datetime

# i tried a bunch of solutions to formatting the date, this was the most straightforward i came up with
# i prioritised readability of the db above everything else (this date is to be used as a doc key), other date formats included hours/mins by default, or 
# had timezones etc...

# date is converted to string as date object was invalid when attempting to insert to mongodb
# fx to convert date back to date obj: 
# date_obj = datetime.datetime.strptime(date_string, '%Y-%m-%d')
def get_time():
    currentDay = str(datetime.datetime.now().day)
    currentMonth = str(datetime.datetime.now().month)
    currentYear = str(datetime.datetime.now().year)
    return f'{currentYear}-{currentMonth}-{currentDay}'