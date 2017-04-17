#### action: changeCurrentOwner
Adds information about organisation/user (Owner) for whom the ranking list is being prepared.
By now, the default organisation is set to Angular, however this option might be useful in the case of future app development.
#### action: addRepos
Adds all Owner's repositories to store.
#### action: changePageStatus
Changes alerts displayed in the top right corner during the data download.
The final status change to 'done' triggers page title change and removes 'loading...' message from filters.
All alerts are stored in ALERTS object in the HomePage
#### action: addRepoContributors
This is where the magic happens. The action is triggered every time the list of contributors if downloaded for each repo.
Contributors are divided into two groups - unique contributors and duplicate contributors.
Based on above division, the total number of contributions for each contributor is calculated.
The final list of unique contributors with summed up contributions is created.
Additional list of all repos and contributors is created (contributorsWithRepos). This list is used for finding Owner's contributors and repos on UserPage and ReposPage.
Both lists are added to the store.
#### action: addContributorInfo
Adds detailed info for each contributor. This information is used in filters and UserPage.
#### action: addFilterMaxValues
This action does not receive any value.
It searches for contributors with the highest amount of contributions, followers, repos and gists.
The numbers are added to the store and increased by one, as filters display contributors with < amount of filtered feature.
