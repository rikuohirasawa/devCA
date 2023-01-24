def check_int(string):
    try: 
        # if over a thousand, remove commas
        if (len(string) >= 5):
            string = str(string).replace(',', '')
        int(string)
        return True
    except ValueError:
        return False
    
    