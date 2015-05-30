# merchant_hierarchy

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