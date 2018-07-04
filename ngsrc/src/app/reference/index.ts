export interface CommandReferenceItem {
  name: string;
  args: string;
  summary: string;
}
export const commandReference: CommandReferenceItem[] = [
  {
    "name": "APPEND",
    "args": "key value",
    "summary": "Append a value to a key"
  },
  {
    "name": "AUTH",
    "args": "password",
    "summary": "Authenticate to the server"
  },
  {
    "name": "BGREWRITEAOF",
    "args": "",
    "summary": "Asynchronously rewrite the append-only file"
  },
  {
    "name": "BGSAVE",
    "args": "",
    "summary": "Asynchronously save the dataset to disk"
  },
  {
    "name": "BITCOUNT",
    "args": "key [start end]",
    "summary": "Count set bits in a string"
  },
  {
    "name": "BITFIELD",
    "args": "key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]",
    "summary": "Perform arbitrary bitfield integer operations on strings"
  },
  {
    "name": "BITOP",
    "args": "operation destkey key [key ...]",
    "summary": "Perform bitwise operations between strings"
  },
  {
    "name": "BITPOS",
    "args": "key bit [start] [end]",
    "summary": "Find first bit set or clear in a string"
  },
  {
    "name": "BLPOP",
    "args": "key [key ...] timeout",
    "summary": "Remove and get the first element in a list, or block until one is available"
  },
  {
    "name": "BRPOP",
    "args": "key [key ...] timeout",
    "summary": "Remove and get the last element in a list, or block until one is available"
  },
  {
    "name": "BRPOPLPUSH",
    "args": "source destination timeout",
    "summary": "Pop a value from a list, push it to another list and return it; or block until one is available"
  },
  {
    "name": "BZPOPMAX",
    "args": "key [key ...] timeout",
    "summary": "Remove and return the member with the highest score from one or more sorted sets, or block until one is available"
  },
  {
    "name": "BZPOPMIN",
    "args": "key [key ...] timeout",
    "summary": "Remove and return the member with the lowest score from one or more sorted sets, or block until one is available"
  },
  {
    "name": "CLIENT GETNAME",
    "args": "",
    "summary": "Get the current connection name"
  },
  {
    "name": "CLIENT KILL",
    "args": "[ip:port] [ID client-id] [TYPE normal|master|slave|pubsub] [ADDR ip:port] [SKIPME yes/no]",
    "summary": "Kill the connection of a client"
  },
  {
    "name": "CLIENT LIST",
    "args": "",
    "summary": "Get the list of client connections"
  },
  {
    "name": "CLIENT PAUSE",
    "args": "timeout",
    "summary": "Stop processing commands from clients for some time"
  },
  {
    "name": "CLIENT REPLY",
    "args": "ON|OFF|SKIP",
    "summary": "Instruct the server whether to reply to commands"
  },
  {
    "name": "CLIENT SETNAME",
    "args": "connection-name",
    "summary": "Set the current connection name"
  },
  {
    "name": "CLUSTER ADDSLOTS",
    "args": "slot [slot ...]",
    "summary": "Assign new hash slots to receiving node"
  },
  {
    "name": "CLUSTER COUNT-FAILURE-REPORTS",
    "args": "node-id",
    "summary": "Return the number of failure reports active for a given node"
  },
  {
    "name": "CLUSTER COUNTKEYSINSLOT",
    "args": "slot",
    "summary": "Return the number of local keys in the specified hash slot"
  },
  {
    "name": "CLUSTER DELSLOTS",
    "args": "slot [slot ...]",
    "summary": "Set hash slots as unbound in receiving node"
  },
  {
    "name": "CLUSTER FAILOVER",
    "args": "[FORCE|TAKEOVER]",
    "summary": "Forces a slave to perform a manual failover of its master."
  },
  {
    "name": "CLUSTER FORGET",
    "args": "node-id",
    "summary": "Remove a node from the nodes table"
  },
  {
    "name": "CLUSTER GETKEYSINSLOT",
    "args": "slot count",
    "summary": "Return local key names in the specified hash slot"
  },
  {
    "name": "CLUSTER INFO",
    "args": "",
    "summary": "Provides info about Redis Cluster node state"
  },
  {
    "name": "CLUSTER KEYSLOT",
    "args": "key",
    "summary": "Returns the hash slot of the specified key"
  },
  {
    "name": "CLUSTER MEET",
    "args": "ip port",
    "summary": "Force a node cluster to handshake with another node"
  },
  {
    "name": "CLUSTER NODES",
    "args": "",
    "summary": "Get Cluster config for the node"
  },
  {
    "name": "CLUSTER REPLICATE",
    "args": "node-id",
    "summary": "Reconfigure a node as a slave of the specified master node"
  },
  {
    "name": "CLUSTER RESET",
    "args": "[HARD|SOFT]",
    "summary": "Reset a Redis Cluster node"
  },
  {
    "name": "CLUSTER SAVECONFIG",
    "args": "",
    "summary": "Forces the node to save cluster state on disk"
  },
  {
    "name": "CLUSTER SET-CONFIG-EPOCH",
    "args": "config-epoch",
    "summary": "Set the configuration epoch in a new node"
  },
  {
    "name": "CLUSTER SETSLOT",
    "args": "slot IMPORTING|MIGRATING|STABLE|NODE [node-id]",
    "summary": "Bind a hash slot to a specific node"
  },
  {
    "name": "CLUSTER SLAVES",
    "args": "node-id",
    "summary": "List slave nodes of the specified master node"
  },
  {
    "name": "CLUSTER SLOTS",
    "args": "",
    "summary": "Get array of Cluster slot to node mappings"
  },
  {
    "name": "COMMAND",
    "args": "",
    "summary": "Get array of Redis command details"
  },
  {
    "name": "COMMAND COUNT",
    "args": "",
    "summary": "Get total number of Redis commands"
  },
  {
    "name": "COMMAND GETKEYS",
    "args": "",
    "summary": "Extract keys given a full Redis command"
  },
  {
    "name": "COMMAND INFO",
    "args": "command-name [command-name ...]",
    "summary": "Get array of specific Redis command details"
  },
  {
    "name": "CONFIG GET",
    "args": "parameter",
    "summary": "Get the value of a configuration parameter"
  },
  {
    "name": "CONFIG RESETSTAT",
    "args": "",
    "summary": "Reset the stats returned by INFO"
  },
  {
    "name": "CONFIG REWRITE",
    "args": "",
    "summary": "Rewrite the configuration file with the in memory configuration"
  },
  {
    "name": "CONFIG SET",
    "args": "parameter value",
    "summary": "Set a configuration parameter to the given value"
  },
  {
    "name": "DBSIZE",
    "args": "",
    "summary": "Return the number of keys in the selected database"
  },
  {
    "name": "DEBUG OBJECT",
    "args": "key",
    "summary": "Get debugging information about a key"
  },
  {
    "name": "DEBUG SEGFAULT",
    "args": "",
    "summary": "Make the server crash"
  },
  {
    "name": "DECR",
    "args": "key",
    "summary": "Decrement the integer value of a key by one"
  },
  {
    "name": "DECRBY",
    "args": "key decrement",
    "summary": "Decrement the integer value of a key by the given number"
  },
  {
    "name": "DEL",
    "args": "key [key ...]",
    "summary": "Delete a key"
  },
  {
    "name": "DISCARD",
    "args": "",
    "summary": "Discard all commands issued after MULTI"
  },
  {
    "name": "DUMP",
    "args": "key",
    "summary": "Return a serialized version of the value stored at the specified key."
  },
  {
    "name": "ECHO",
    "args": "message",
    "summary": "Echo the given string"
  },
  {
    "name": "EVAL",
    "args": "script numkeys key [key ...] arg [arg ...]",
    "summary": "Execute a Lua script server side"
  },
  {
    "name": "EVALSHA",
    "args": "sha1 numkeys key [key ...] arg [arg ...]",
    "summary": "Execute a Lua script server side"
  },
  {
    "name": "EXEC",
    "args": "",
    "summary": "Execute all commands issued after MULTI"
  },
  {
    "name": "EXISTS",
    "args": "key [key ...]",
    "summary": "Determine if a key exists"
  },
  {
    "name": "EXPIRE",
    "args": "key seconds",
    "summary": "Set a key's time to live in seconds"
  },
  {
    "name": "EXPIREAT",
    "args": "key timestamp",
    "summary": "Set the expiration for a key as a UNIX timestamp"
  },
  {
    "name": "FLUSHALL",
    "args": "[ASYNC]",
    "summary": "Remove all keys from all databases"
  },
  {
    "name": "FLUSHDB",
    "args": "[ASYNC]",
    "summary": "Remove all keys from the current database"
  },
  {
    "name": "GEOADD",
    "args": "key longitude latitude member [longitude latitude member ...]",
    "summary": "Add one or more geospatial items in the geospatial index represented using a sorted set"
  },
  {
    "name": "GEODIST",
    "args": "key member1 member2 [unit]",
    "summary": "Returns the distance between two members of a geospatial index"
  },
  {
    "name": "GEOHASH",
    "args": "key member [member ...]",
    "summary": "Returns members of a geospatial index as standard geohash strings"
  },
  {
    "name": "GEOPOS",
    "args": "key member [member ...]",
    "summary": "Returns longitude and latitude of members of a geospatial index"
  },
  {
    "name": "GEORADIUS",
    // tslint:disable-next-line:max-line-length
    "args": "key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]",
    "summary": "Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point"
  },
  {
    "name": "GEORADIUSBYMEMBER",
    "args": "key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]",
    "summary": "Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member"
  },
  {
    "name": "GET",
    "args": "key",
    "summary": "Get the value of a key"
  },
  {
    "name": "GETBIT",
    "args": "key offset",
    "summary": "Returns the bit value at offset in the string value stored at key"
  },
  {
    "name": "GETRANGE",
    "args": "key start end",
    "summary": "Get a substring of the string stored at a key"
  },
  {
    "name": "GETSET",
    "args": "key value",
    "summary": "Set the string value of a key and return its old value"
  },
  {
    "name": "HDEL",
    "args": "key field [field ...]",
    "summary": "Delete one or more hash fields"
  },
  {
    "name": "HEXISTS",
    "args": "key field",
    "summary": "Determine if a hash field exists"
  },
  {
    "name": "HGET",
    "args": "key field",
    "summary": "Get the value of a hash field"
  },
  {
    "name": "HGETALL",
    "args": "key",
    "summary": "Get all the fields and values in a hash"
  },
  {
    "name": "HINCRBY",
    "args": "key field increment",
    "summary": "Increment the integer value of a hash field by the given number"
  },
  {
    "name": "HINCRBYFLOAT",
    "args": "key field increment",
    "summary": "Increment the float value of a hash field by the given amount"
  },
  {
    "name": "HKEYS",
    "args": "key",
    "summary": "Get all the fields in a hash"
  },
  {
    "name": "HLEN",
    "args": "key",
    "summary": "Get the number of fields in a hash"
  },
  {
    "name": "HMGET",
    "args": "key field [field ...]",
    "summary": "Get the values of all the given hash fields"
  },
  {
    "name": "HMSET",
    "args": "key field value [field value ...]",
    "summary": "Set multiple hash fields to multiple values"
  },
  {
    "name": "HSCAN",
    "args": "key cursor [MATCH pattern] [COUNT count]",
    "summary": "Incrementally iterate hash fields and associated values"
  },
  {
    "name": "HSET",
    "args": "key field value",
    "summary": "Set the string value of a hash field"
  },
  {
    "name": "HSETNX",
    "args": "key field value",
    "summary": "Set the value of a hash field, only if the field does not exist"
  },
  {
    "name": "HSTRLEN",
    "args": "key field",
    "summary": "Get the length of the value of a hash field"
  },
  {
    "name": "HVALS",
    "args": "key",
    "summary": "Get all the values in a hash"
  },
  {
    "name": "INCR",
    "args": "key",
    "summary": "Increment the integer value of a key by one"
  },
  {
    "name": "INCRBY",
    "args": "key increment",
    "summary": "Increment the integer value of a key by the given amount"
  },
  {
    "name": "INCRBYFLOAT",
    "args": "key increment",
    "summary": "Increment the float value of a key by the given amount"
  },
  {
    "name": "INFO",
    "args": "[section]",
    "summary": "Get information and statistics about the server"
  },
  {
    "name": "KEYS",
    "args": "pattern",
    "summary": "Find all keys matching the given pattern"
  },
  {
    "name": "LASTSAVE",
    "args": "",
    "summary": "Get the UNIX time stamp of the last successful save to disk"
  },
  {
    "name": "LINDEX",
    "args": "key index",
    "summary": "Get an element from a list by its index"
  },
  {
    "name": "LINSERT",
    "args": "key BEFORE|AFTER pivot value",
    "summary": "Insert an element before or after another element in a list"
  },
  {
    "name": "LLEN",
    "args": "key",
    "summary": "Get the length of a list"
  },
  {
    "name": "LPOP",
    "args": "key",
    "summary": "Remove and get the first element in a list"
  },
  {
    "name": "LPUSH",
    "args": "key value [value ...]",
    "summary": "Prepend one or multiple values to a list"
  },
  {
    "name": "LPUSHX",
    "args": "key value",
    "summary": "Prepend a value to a list, only if the list exists"
  },
  {
    "name": "LRANGE",
    "args": "key start stop",
    "summary": "Get a range of elements from a list"
  },
  {
    "name": "LREM",
    "args": "key count value",
    "summary": "Remove elements from a list"
  },
  {
    "name": "LSET",
    "args": "key index value",
    "summary": "Set the value of an element in a list by its index"
  },
  {
    "name": "LTRIM",
    "args": "key start stop",
    "summary": "Trim a list to the specified range"
  },
  {
    "name": "MEMORY DOCTOR",
    "args": "",
    "summary": "Outputs memory problems report"
  },
  {
    "name": "MEMORY HELP",
    "args": "",
    "summary": "Show helpful text about the different subcommands"
  },
  {
    "name": "MEMORY MALLOC-STATS",
    "args": "",
    "summary": "Show allocator internal stats"
  },
  {
    "name": "MEMORY PURGE",
    "args": "",
    "summary": "Ask the allocator to release memory"
  },
  {
    "name": "MEMORY STATS",
    "args": "",
    "summary": "Show memory usage details"
  },
  {
    "name": "MEMORY USAGE",
    "args": "key [SAMPLES count]",
    "summary": "Estimate the memory usage of a key"
  },
  {
    "name": "MGET",
    "args": "key [key ...]",
    "summary": "Get the values of all the given keys"
  },
  {
    "name": "MIGRATE",
    "args": "host port key|\"\" destination-db timeout [COPY] [REPLACE] [KEYS key [key ...]]",
    "summary": "Atomically transfer a key from a Redis instance to another one."
  },
  {
    "name": "MONITOR",
    "args": "",
    "summary": "Listen for all requests received by the server in real time"
  },
  {
    "name": "MOVE",
    "args": "key db",
    "summary": "Move a key to another database"
  },
  {
    "name": "MSET",
    "args": "key value [key value ...]",
    "summary": "Set multiple keys to multiple values"
  },
  {
    "name": "MSETNX",
    "args": "key value [key value ...]",
    "summary": "Set multiple keys to multiple values, only if none of the keys exist"
  },
  {
    "name": "MULTI",
    "args": "",
    "summary": "Mark the start of a transaction block"
  },
  {
    "name": "OBJECT",
    "args": "subcommand [arguments [arguments ...]]",
    "summary": "Inspect the internals of Redis objects"
  },
  {
    "name": "PERSIST",
    "args": "key",
    "summary": "Remove the expiration from a key"
  },
  {
    "name": "PEXPIRE",
    "args": "key milliseconds",
    "summary": "Set a key's time to live in milliseconds"
  },
  {
    "name": "PEXPIREAT",
    "args": "key milliseconds-timestamp",
    "summary": "Set the expiration for a key as a UNIX timestamp specified in milliseconds"
  },
  {
    "name": "PFADD",
    "args": "key element [element ...]",
    "summary": "Adds the specified elements to the specified HyperLogLog."
  },
  {
    "name": "PFCOUNT",
    "args": "key [key ...]",
    "summary": "Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s)."
  },
  {
    "name": "PFMERGE",
    "args": "destkey sourcekey [sourcekey ...]",
    "summary": "Merge N different HyperLogLogs into a single one."
  },
  {
    "name": "PING",
    "args": "[message]",
    "summary": "Ping the server"
  },
  {
    "name": "PSETEX",
    "args": "key milliseconds value",
    "summary": "Set the value and expiration in milliseconds of a key"
  },
  {
    "name": "PSUBSCRIBE",
    "args": "pattern [pattern ...]",
    "summary": "Listen for messages published to channels matching the given patterns"
  },
  {
    "name": "PTTL",
    "args": "key",
    "summary": "Get the time to live for a key in milliseconds"
  },
  {
    "name": "PUBLISH",
    "args": "channel message",
    "summary": "Post a message to a channel"
  },
  {
    "name": "PUBSUB",
    "args": "subcommand [argument [argument ...]]",
    "summary": "Inspect the state of the Pub/Sub subsystem"
  },
  {
    "name": "PUNSUBSCRIBE",
    "args": "[pattern [pattern ...]]",
    "summary": "Stop listening for messages posted to channels matching the given patterns"
  },
  {
    "name": "QUIT",
    "args": "",
    "summary": "Close the connection"
  },
  {
    "name": "RANDOMKEY",
    "args": "",
    "summary": "Return a random key from the keyspace"
  },
  {
    "name": "READONLY",
    "args": "",
    "summary": "Enables read queries for a connection to a cluster slave node"
  },
  {
    "name": "READWRITE",
    "args": "",
    "summary": "Disables read queries for a connection to a cluster slave node"
  },
  {
    "name": "RENAME",
    "args": "key newkey",
    "summary": "Rename a key"
  },
  {
    "name": "RENAMENX",
    "args": "key newkey",
    "summary": "Rename a key, only if the new key does not exist"
  },
  {
    "name": "RESTORE",
    "args": "key ttl serialized-value [REPLACE]",
    "summary": "Create a key using the provided serialized value, previously obtained using DUMP."
  },
  {
    "name": "ROLE",
    "args": "",
    "summary": "Return the role of the instance in the context of replication"
  },
  {
    "name": "RPOP",
    "args": "key",
    "summary": "Remove and get the last element in a list"
  },
  {
    "name": "RPOPLPUSH",
    "args": "source destination",
    "summary": "Remove the last element in a list, prepend it to another list and return it"
  },
  {
    "name": "RPUSH",
    "args": "key value [value ...]",
    "summary": "Append one or multiple values to a list"
  },
  {
    "name": "RPUSHX",
    "args": "key value",
    "summary": "Append a value to a list, only if the list exists"
  },
  {
    "name": "SADD",
    "args": "key member [member ...]",
    "summary": "Add one or more members to a set"
  },
  {
    "name": "SAVE",
    "args": "",
    "summary": "Synchronously save the dataset to disk"
  },
  {
    "name": "SCAN",
    "args": "cursor [MATCH pattern] [COUNT count]",
    "summary": "Incrementally iterate the keys space"
  },
  {
    "name": "SCARD",
    "args": "key",
    "summary": "Get the number of members in a set"
  },
  {
    "name": "SCRIPT DEBUG",
    "args": "YES|SYNC|NO",
    "summary": "Set the debug mode for executed scripts."
  },
  {
    "name": "SCRIPT EXISTS",
    "args": "sha1 [sha1 ...]",
    "summary": "Check existence of scripts in the script cache."
  },
  {
    "name": "SCRIPT FLUSH",
    "args": "",
    "summary": "Remove all the scripts from the script cache."
  },
  {
    "name": "SCRIPT KILL",
    "args": "",
    "summary": "Kill the script currently in execution."
  },
  {
    "name": "SCRIPT LOAD",
    "args": "script",
    "summary": "Load the specified Lua script into the script cache."
  },
  {
    "name": "SDIFF",
    "args": "key [key ...]",
    "summary": "Subtract multiple sets"
  },
  {
    "name": "SDIFFSTORE",
    "args": "destination key [key ...]",
    "summary": "Subtract multiple sets and store the resulting set in a key"
  },
  {
    "name": "SELECT",
    "args": "index",
    "summary": "Change the selected database for the current connection"
  },
  {
    "name": "SET",
    "args": "key value [expiration EX seconds|PX milliseconds] [NX|XX]",
    "summary": "Set the string value of a key"
  },
  {
    "name": "SETBIT",
    "args": "key offset value",
    "summary": "Sets or clears the bit at offset in the string value stored at key"
  },
  {
    "name": "SETEX",
    "args": "key seconds value",
    "summary": "Set the value and expiration of a key"
  },
  {
    "name": "SETNX",
    "args": "key value",
    "summary": "Set the value of a key, only if the key does not exist"
  },
  {
    "name": "SETRANGE",
    "args": "key offset value",
    "summary": "Overwrite part of a string at key starting at the specified offset"
  },
  {
    "name": "SHUTDOWN",
    "args": "[NOSAVE|SAVE]",
    "summary": "Synchronously save the dataset to disk and then shut down the server"
  },
  {
    "name": "SINTER",
    "args": "key [key ...]",
    "summary": "Intersect multiple sets"
  },
  {
    "name": "SINTERSTORE",
    "args": "destination key [key ...]",
    "summary": "Intersect multiple sets and store the resulting set in a key"
  },
  {
    "name": "SISMEMBER",
    "args": "key member",
    "summary": "Determine if a given value is a member of a set"
  },
  {
    "name": "SLAVEOF",
    "args": "host port",
    "summary": "Make the server a slave of another instance, or promote it as master"
  },
  {
    "name": "SLOWLOG",
    "args": "subcommand [argument]",
    "summary": "Manages the Redis slow queries log"
  },
  {
    "name": "SMEMBERS",
    "args": "key",
    "summary": "Get all the members in a set"
  },
  {
    "name": "SMOVE",
    "args": "source destination member",
    "summary": "Move a member from one set to another"
  },
  {
    "name": "SORT",
    "args": "key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]",
    "summary": "Sort the elements in a list, set or sorted set"
  },
  {
    "name": "SPOP",
    "args": "key [count]",
    "summary": "Remove and return one or multiple random members from a set"
  },
  {
    "name": "SRANDMEMBER",
    "args": "key [count]",
    "summary": "Get one or multiple random members from a set"
  },
  {
    "name": "SREM",
    "args": "key member [member ...]",
    "summary": "Remove one or more members from a set"
  },
  {
    "name": "SSCAN",
    "args": "key cursor [MATCH pattern] [COUNT count]",
    "summary": "Incrementally iterate Set elements"
  },
  {
    "name": "STRLEN",
    "args": "key",
    "summary": "Get the length of the value stored in a key"
  },
  {
    "name": "SUBSCRIBE",
    "args": "channel [channel ...]",
    "summary": "Listen for messages published to the given channels"
  },
  {
    "name": "SUNION",
    "args": "key [key ...]",
    "summary": "Add multiple sets"
  },
  {
    "name": "SUNIONSTORE",
    "args": "destination key [key ...]",
    "summary": "Add multiple sets and store the resulting set in a key"
  },
  {
    "name": "SWAPDB",
    "args": "index index",
    "summary": "Swaps two Redis databases"
  },
  {
    "name": "SYNC",
    "args": "",
    "summary": "Internal command used for replication"
  },
  {
    "name": "TIME",
    "args": "",
    "summary": "Return the current server time"
  },
  {
    "name": "TOUCH",
    "args": "key [key ...]",
    "summary": "Alters the last access time of a key(s). Returns the number of existing keys specified."
  },
  {
    "name": "TTL",
    "args": "key",
    "summary": "Get the time to live for a key"
  },
  {
    "name": "TYPE",
    "args": "key",
    "summary": "Determine the type stored at key"
  },
  {
    "name": "UNLINK",
    "args": "key [key ...]",
    "summary": "Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking."
  },
  {
    "name": "UNSUBSCRIBE",
    "args": "[channel [channel ...]]",
    "summary": "Stop listening for messages posted to the given channels"
  },
  {
    "name": "UNWATCH",
    "args": "",
    "summary": "Forget about all watched keys"
  },
  {
    "name": "WAIT",
    "args": "numslaves timeout",
    "summary": "Wait for the synchronous replication of all the write commands sent in the context of the current connection"
  },
  {
    "name": "WATCH",
    "args": "key [key ...]",
    "summary": "Watch the given keys to determine execution of the MULTI/EXEC block"
  },
  {
    "name": "XADD",
    "args": "key ID field string [field string ...]",
    "summary": "Appends a new entry to a stream"
  },
  {
    "name": "XLEN",
    "args": "key",
    "summary": "Return the number of entires in a stream"
  },
  {
    "name": "XPENDING",
    "args": "key group [start end count] [consumer]",
    // tslint:disable-next-line:max-line-length
    "summary": "Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged."
  },
  {
    "name": "XRANGE",
    "args": "key start end [COUNT count]",
    "summary": "Return a range of elements in a stream, with IDs matching the specified IDs interval"
  },
  {
    "name": "XREAD",
    "args": "[COUNT count] [BLOCK milliseconds] STREAMS key [key ...] ID [ID ...]",
    // tslint:disable-next-line:max-line-length
    "summary": "Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block."
  },
  {
    "name": "XREADGROUP",
    "args": "GROUP group consumer [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] ID [ID ...]",
    // tslint:disable-next-line:max-line-length
    "summary": "Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block."
  },
  {
    "name": "XREVRANGE",
    "args": "key end start [COUNT count]",
    // tslint:disable-next-line:max-line-length
    "summary": "Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE"
  },
  {
    "name": "ZADD",
    "args": "key [NX|XX] [CH] [INCR] score member [score member ...]",
    "summary": "Add one or more members to a sorted set, or update its score if it already exists"
  },
  {
    "name": "ZCARD",
    "args": "key",
    "summary": "Get the number of members in a sorted set"
  },
  {
    "name": "ZCOUNT",
    "args": "key min max",
    "summary": "Count the members in a sorted set with scores within the given values"
  },
  {
    "name": "ZINCRBY",
    "args": "key increment member",
    "summary": "Increment the score of a member in a sorted set"
  },
  {
    "name": "ZINTERSTORE",
    "args": "destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]",
    "summary": "Intersect multiple sorted sets and store the resulting sorted set in a new key"
  },
  {
    "name": "ZLEXCOUNT",
    "args": "key min max",
    "summary": "Count the number of members in a sorted set between a given lexicographical range"
  },
  {
    "name": "ZPOPMAX",
    "args": "key [count]",
    "summary": "Remove and return members with the highest scores in a sorted set"
  },
  {
    "name": "ZPOPMIN",
    "args": "key [count]",
    "summary": "Remove and return members with the lowest scores in a sorted set"
  },
  {
    "name": "ZRANGE",
    "args": "key start stop [WITHSCORES]",
    "summary": "Return a range of members in a sorted set, by index"
  },
  {
    "name": "ZRANGEBYLEX",
    "args": "key min max [LIMIT offset count]",
    "summary": "Return a range of members in a sorted set, by lexicographical range"
  },
  {
    "name": "ZRANGEBYSCORE",
    "args": "key min max [WITHSCORES] [LIMIT offset count]",
    "summary": "Return a range of members in a sorted set, by score"
  },
  {
    "name": "ZRANK",
    "args": "key member",
    "summary": "Determine the index of a member in a sorted set"
  },
  {
    "name": "ZREM",
    "args": "key member [member ...]",
    "summary": "Remove one or more members from a sorted set"
  },
  {
    "name": "ZREMRANGEBYLEX",
    "args": "key min max",
    "summary": "Remove all members in a sorted set between the given lexicographical range"
  },
  {
    "name": "ZREMRANGEBYRANK",
    "args": "key start stop",
    "summary": "Remove all members in a sorted set within the given indexes"
  },
  {
    "name": "ZREMRANGEBYSCORE",
    "args": "key min max",
    "summary": "Remove all members in a sorted set within the given scores"
  },
  {
    "name": "ZREVRANGE",
    "args": "key start stop [WITHSCORES]",
    "summary": "Return a range of members in a sorted set, by index, with scores ordered from high to low"
  },
  {
    "name": "ZREVRANGEBYLEX",
    "args": "key max min [LIMIT offset count]",
    "summary": "Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings."
  },
  {
    "name": "ZREVRANGEBYSCORE",
    "args": "key max min [WITHSCORES] [LIMIT offset count]",
    "summary": "Return a range of members in a sorted set, by score, with scores ordered from high to low"
  },
  {
    "name": "ZREVRANK",
    "args": "key member",
    "summary": "Determine the index of a member in a sorted set, with scores ordered from high to low"
  },
  {
    "name": "ZSCAN",
    "args": "key cursor [MATCH pattern] [COUNT count]",
    "summary": "Incrementally iterate sorted sets elements and associated scores"
  },
  {
    "name": "ZSCORE",
    "args": "key member",
    "summary": "Get the score associated with the given member in a sorted set"
  },
  {
    "name": "ZUNIONSTORE",
    "args": "destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]",
    "summary": "Add multiple sorted sets and store the resulting sorted set in a new key"
  }
];
