# twitter-clone

-   users
-   tweets
-   likes
-   retweets
-   comments
-   follows

## users

-   id (primary key auto increment)
-   username (string unique)
-   password (string)

## tweets

-   id (primary key auto increment)
-   user_id (foreign key)
-   content (string)
