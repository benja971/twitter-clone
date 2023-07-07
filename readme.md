# twitter-clone

This project is a clone of twitter simplified to the extreme within the framework of a demonstration

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

## relationships

-   id (primary key auto increment)
-   follower_id (foreign key users(id))
-   following_id (foreign key users(id))

