import CifFile  #existing library for reading in CIF format
import os       #operating system
import re       #regular expressions
import numpy as np  #numeric python
#from enthought.mayavi import mlab #enthought.mayavi
#import SMMcalc_lib

def CIF_to_cell(file_name = "C:/Webrefinemain/test.cif", select_atoms = []):
    """read in the contents of a CIF file
    
    have the option of only including a specific sub-set of atoms in the cell
    
    inputs:
        file_name: a string with front slashes for file tree delimiters that directs to the location of the CIF file
        select_atoms: a list of atoms to use, if left blank, all atoms are used
    
    output:
        [atom_label, fractional_coordinates]
        
    """
      
    #convert file_name to acceptable format
#    file_name = "file://" + file_name
    file_name = os.path.normpath("file://" + file_name)
    
    #read contents of CIF file
    cf = CifFile.ReadCif(file_name)
    sample_name = cf.dictionary.keys()[0]
    
    #make a complete select_atoms list if a null list was provided
    if select_atoms == []:
        select_atoms = list(set(cf[sample_name]['_atom_site_type_symbol']))
    
    #extract the types of the selected atoms and their fractional coordinates
    i = 0
    atoms = []
    fract_coords = []
    for j in cf[sample_name]['_atom_site_type_symbol']:
        for k in select_atoms:
            if j == k:
    
                x = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_atom_site_fract_x'][i])))
                y = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_atom_site_fract_y'][i])))
                z = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_atom_site_fract_z'][i])))
    
                fract_coords.append(np.array([x,y,z]))  #fraction coordinates
                atoms.append(j)                         #atom types
        i = i + 1
    
    #take the given atoms and populate a complete P1-type unit cell
    
    #first pick out the space group
    space_group_name = re.sub('\)','',re.sub('\(','',cf[sample_name]['_symmetry_space_group_name_H-M']))
    
    print 'be very careful that the correct setting is being used for the space group'
    
    for i in range(np.size(SpaceGroups.SpaceGroupList)):
         if space_group_name == SpaceGroups.SpaceGroupList[i].short_name:
             space_group = SpaceGroups.SpaceGroupList[i]
    
    #then step through each atom, and apply symmetry operators to populate the cell
    for i in range(np.size(atoms)):
        for j in space_group.symop_list:
    #        apply the symmetry operator to 'coords' to make a new vector
            fract_coords_new = np.dot(j.R, fract_coords[i])+j.t
    #        if the new vector is outside the primitive cell, move it back
            for k in [0,1,2]:
                while fract_coords_new[k] >= 1:
                    fract_coords_new[k] = fract_coords_new[k]-1
                while fract_coords_new[k] < 0:
                    fract_coords_new[k] = fract_coords_new[k]+1
    #        add the new position to the list if it isn't already there
    #        check to within a tolerance to avoid numeric errors
            sym_tol = 0.0001
            degtest = 0
            for l in range(np.size(atoms)):
                if (fract_coords_new[0] > fract_coords[l][0]-sym_tol and fract_coords_new[0] < fract_coords[l][0]+sym_tol)\
                and (fract_coords_new[1] > fract_coords[l][1]-sym_tol and fract_coords_new[1] < fract_coords[l][1]+sym_tol)\
                and (fract_coords_new[2] > fract_coords[l][2]-sym_tol and fract_coords_new[2] < fract_coords[l][2]+sym_tol):
                    degtest = 1
                    
            if degtest == 0:
                fract_coords.append(fract_coords_new)
                atoms.append(atoms[i])
    return [atoms, fract_coords]

def atom_chooser(file_name = "C:/LanthanideSMMs/GdCu SMMs/7.cif", atoms = [], fract_coords = []):
    """display a list of atoms using a list of fractional coordinate arrays
    
    unit cell parameters will be extracted from the CIF-file
    
    inputs:
        file_name: a string with front slashes for file tree delimiters that directs to the location of the CIF file
        atoms: string list of atoms index in same manner as fract_coords
        fract_coords: a list of numpy arrays containing the fractional coordinates
    
    output:
        chosen_atom_indices
        
    """
      
    #convert file_name to acceptable format
    file_name = "file://" + file_name
    file_name = os.path.normpath(file_name)
    
    #read contents of CIF file
    cf = CifFile.ReadCif(file_name)
    sample_name = cf.dictionary.keys()[0]
    
    
    #unit cell in meters (converted from Angstroms)
    a =  float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_length_a']))) * 1e-10
    b =  float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_length_b']))) * 1e-10
    c =  float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_length_c']))) * 1e-10
    
    #angles in degrees
    alpha = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_angle_alpha'])))
    beta  = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_angle_beta'])))
    gamma = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_angle_gamma'])))
    
    #angles in radians
    alpha_ = alpha*np.pi/180
    beta_ = beta*np.pi/180
    gamma_ = gamma*np.pi/180
    
    #need to generate real space vectors...
    a1 = np.array([a, 0, 0])
    a2 = np.array([b*np.cos(gamma_), b*np.sin(gamma_)*np.sqrt(1-(np.cos(gamma_)*np.cos(beta_)-np.cos(alpha_))**2/(np.sin(gamma_)**2*np.sin(beta_)**2)), b*np.sin(gamma_)*(np.cos(gamma_)*np.cos(beta_)-np.cos(alpha_))/(np.sin(gamma_)*np.sin(beta_))])
    a3 = np.array([c*np.cos(beta_), 0, c*np.sin(beta_)])
    
    a1_A = a1*1e10
    a2_A = a2*1e10
    a3_A = a3*1e10
    
    #start the mayavi pipeline
#    mlab.figure(fgcolor = (0,0,0), bgcolor = (1,1,1))
    
    #display the bounding box of the unit cell
    #mlab.plot3d([0,a1_A[0]], [0,a1_A[1]], [0,a1_A[2]], line_width = 4)
    #mlab.plot3d([0,a2_A[0]], [0,a2_A[1]], [0,a2_A[2]], line_width = 4)
    #mlab.plot3d([a1_A[0], a1_A[0]+a2_A[0]], [a1_A[1], a1_A[1]+a2_A[1]], [a1_A[2], a1_A[2]+a2_A[2]], line_width = 4)
    #mlab.plot3d([a2_A[0], a1_A[0]+a2_A[0]], [a2_A[1], a1_A[1]+a2_A[1]], [a2_A[2], a1_A[2]+a2_A[2]], line_width = 4)
    
    #mlab.plot3d([a3_A[0]+0,a1_A[0]+a3_A[0]], [a3_A[1]+0,a1_A[1]+a3_A[1]], [a3_A[2]+0,a1_A[2]+a3_A[2]], line_width = 4)
    #mlab.plot3d([a3_A[0]+0,a2_A[0]+a3_A[0]], [a3_A[1]+0,a2_A[1]+a3_A[1]], [a3_A[2]+0,a2_A[2]+a3_A[2]], line_width = 4)
    #mlab.plot3d([a3_A[0]+a1_A[0], a1_A[0]+a2_A[0]+a3_A[0]], [a3_A[1]+a1_A[1], a1_A[1]+a2_A[1]+a3_A[1]], [a3_A[2]+a1_A[2], a1_A[2]+a2_A[2]+a3_A[2]], line_width = 4)
    #mlab.plot3d([a3_A[0]+a2_A[0], a1_A[0]+a2_A[0]+a3_A[0]], [a3_A[1]+a2_A[1], a1_A[1]+a2_A[1]+a3_A[1]], [a3_A[2]+a2_A[2], a1_A[2]+a2_A[2]+a3_A[2]], line_width = 4)
    
    #mlab.plot3d([0,a3_A[0]], [0,a3_A[1]], [0,a3_A[2]], line_width = 4)
    #mlab.plot3d([a1_A[0],a1_A[0]+a3_A[0]], [a1_A[1],a1_A[1]+a3_A[1]], [a1_A[2],a1_A[2]+a3_A[2]], line_width = 4)
    #mlab.plot3d([a2_A[0],a2_A[0]+a3_A[0]], [a2_A[1],a2_A[1]+a3_A[1]], [a2_A[2],a2_A[2]+a3_A[2]], line_width = 4)
    #mlab.plot3d([a2_A[0]+a1_A[0],a2_A[0]+a1_A[0]+a3_A[0]], [a2_A[1]+a1_A[1],a2_A[1]+a1_A[1]+a3_A[1]], [a2_A[2]+a1_A[2],a2_A[2]+a1_A[2]+a3_A[2]], line_width = 4)
    
    #r_coords = np.zeros(np.shape(fract_coords))
    ##take the fractional coordinates and generate real coordinates using the basis vectors
    #for i in range(np.size(atoms)):
        #r_coords[i] = a1_A * fract_coords[i][0]  +  a2_A * fract_coords[i][1]  +  a3_A * fract_coords[i][2]
        
        
    #for i in range(np.size(atoms)):
        #mlab.points3d(r_coords[i][0], r_coords[i][1], r_coords[i][2], opacity = 0.15, scale_factor = 1, color = (0,0,1), mode = 'cube')
        #mlab.text3d(r_coords[i][0], r_coords[i][1], r_coords[i][2], opacity = 0.35, scale = 0.5, text = atoms[i], color = (0,0,1))

##    placeholder, delete when ready
    #chosen_atom_indices = []
    
    #mlab.show()    
    
    return chosen_atom_indices

