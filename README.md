# Merchant Hierarchy Visualizer

## What is this
A combination of technologies to show the merchant hierarchy structure at Yapstone, which uses a [tree structure](http://en.wikipedia.org/wiki/Tree_%28data_structure%29).

## Install
````
$ git clone github.com/skilbjo/d3.git
$ cd d3 && npm install && gulp
````

## How to
1. Run the following `sql` query
2. Put the output of that query into this path, `parser/in/[your sql query].csv`
3. Run the parsing script found in `parser/tree.js` with the following command, `node tree.js in/[your sql query].csv out/output.json`
4. Point the d3 script to use the `output.json` file you just created!

### SQL Queries
#### Active Merchants (`leaf nodes` only)

````
declare @aggregateId as nvarchar(max), @merchant as nvarchar(max);

set @merchant = 'tri city rentals parent'

set @aggregateId = (select top 1 AggregateId from Company where PlatformId in (1) and
	Name = @merchant
)

select 
	c.ChildName , c.ParentName , c.ChildAggregateId  
from
	YapstoneDM..[Transaction] txn
	inner join ETLStaging..ParentTable c on txn.PlatformId = c.PlatformId and txn.Ref_CompanyId = c.ChildCompanyId
where
	c.ChildAggregateId like @aggregateId + '|%'
group by 
	c.ChildName , c.ParentName ,  c.ChildAggregateId  

````
#### All Merchants (under a given hierarchy)

````
declare @aggregateId as nvarchar(max), @merchant as nvarchar(max);

set @merchant = 'tri city rentals parent'

set @aggregateId = (select top 1 AggregateId from Company where PlatformId in (1) and
	Name = @merchant
)

select 
	c.ChildName , c.ParentName , c.ChildAggregateId  
from
	 ETLStaging..ParentTable c 
where
	c.ChildAggregateId like @aggregateId + '|%'
	or c.ChildAggregateId = @aggregateId
group by 
	c.ChildName , c.ParentName ,  c.ChildAggregateId 
````