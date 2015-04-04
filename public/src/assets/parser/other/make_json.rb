require "csv"
require 'pp'
require 'json'


puts 'Opening input CSV'
puts 'Please use the following: "ruby make_json.rb [input file path] [output file path]"' if ARGV.length != 2

fWriter	= File.open(ARGV[1], 'w')
source	= CSV.read(ARGV[0])
@graph	= {}
@nameStr = String.new
@count = 0

#Find the index of the children array that contains a has with the id==nodeID
def findIndex(children, nodeID)
	children.length.times do |i|
		return i if children[i]['id'] == nodeID
	end
	false
end

#Recursively add vertical hierarchy from aggregateID
def addHierarchy(hierarchy, node)
	node['id'] = hierarchy[0] if (node['id'].nil?)
	hierarchy.shift
	if !hierarchy.empty? then

		if node['children'].nil? then
			node['children'] = [{}]
			addHierarchy(hierarchy, node['children'].first)
		elsif !node['children'].nil? then
			index = findIndex(node['children'], hierarchy[0])
			
			if index then
				addHierarchy(hierarchy, node['children'][index])
			else
				node['children'].push({})
				addHierarchy(hierarchy, node['children'].last)
			end

		end
	else
		node['name'] = @nameStr
		@count +=1
	end

end

#shift first line since it's just the headers
source.shift

#Traverse CSV and get aggregateID to build hierarchy
source.each do |prop|
	if prop.length >= 4 && !prop[3].empty? && !prop[0].gsub(' ', '').empty? then
		hArr = prop[3].split('|')
		@nameStr = prop[0]
		addHierarchy(hArr, @graph)
	end
end

puts @count
fWriter.puts @graph.to_json
fWriter.close