def CIF_file_reading ():
f = open(r"SMMcalcINPUT.txt", "r").read().splitlines()

file_name = f[1]

#convert file_name to acceptable format
file_name = "file://" + file_name
file_name = os.path.normpath(file_name)

#read contents of TEMP file
[atoms, fract_coords] = SMMcalc_lib.tmp_read('TEMP.txt')

#read contents of CIF file
cf = CifFile.ReadCif(file_name)
sample_name = cf.dictionary.keys()[0]