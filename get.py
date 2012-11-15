import urllib, re, json
from time import sleep



for z in range(570):
	if z > 325:
		people = []
		for i in range(100):
			f = urllib.urlopen("http://genealogy.impa.br/id.php?id="+str(i+(z*100)))

			lines = f.read().split("\n")


			index = 0
			person = {'id' : (z*100)+i,'descendents' : []}
			for l in lines:
				if l.find("h2") > 0:
					person['name'] = l.replace("</h2>","").strip()

				if l.find("006633") > 0:
					a = l.find(">")
					b = l.find("<")
					person['school'] = l[a+1:b]

					c = l.rfind("span")
					person['year'] = l[c-6:c-2]


				if l.find("flags") > 0:
					a = 1

				if l.find("Dissertation") > 0:
					person['dissertation'] = lines[index+1].join(lines[index+2]).replace("</span></div>","").strip()

				if l.find("Advisor") > 0:
					m = re.match(r'.*id=(.*)">(.*)</a>',l)
					if m:
						person['advisor'] = { 'id' : int(m.group(1)), 'name' : m.group(2) }


				if l.find("tr") == 1:
					if l.find("id.php") > 0:
						m = re.match(r'.*id=(.*)">(.*)</a></td><td>(.*)</td><td.*>(.*)</td><td.*',l)
						if m:
							person['descendents'].append({
								'id' : int(m.group(1)),
								'name' : m.group(2),
								'school' : m.group(3),
								'year' : m.group(4)
							})

				index = index + 1

			people.append(person)

		f = open('/tmp/mathgene'+str(z), 'w')
		f.write(json.dumps(people))
		print 'finished '+str(z)
		sleep(10)

