Unfortunately, our floor plans are in PDF format, and there is no way to sort the 
doors automatically. My current plan is to label the exterior doors "generally" in order
of most used (main entrance is 1, etc. order will be subjective).

After the doors are labelled (check amoseaton100.pdf for an example for exterior doors),
the doors should have attributes assigned in JSON. The attributes are:

lat: nearest Y value, latitude of nearest point on google maps for exterior
long: nearest X value, longitude of nearest point on google maps for exterior
stairs: true/false. If there are ANY stairs, no matter how small, the value should be true.
stair_size: S,M, or L. S (small) is 3 or less, M (medium) is 3-7, and L (large) is more than 7
stair_num: exact number of stairs. If unknown, value should be null and estimate in stair_size
button: automatic doors or buttons

more attributes will be added as progress is made (uneven terrain, etc)