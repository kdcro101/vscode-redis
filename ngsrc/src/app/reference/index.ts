export interface CommandReferenceItem {
    name: string;
    args: string;
    summary: string;
    url: string;
}
export function isValidInput(commandLine: string): boolean {
    if (commandLine == null || commandLine.trim() === "") {
        return true; // just starting - it is valid state
    }

    const compact = compactCommandLine(commandLine);
    const extracted = extractRedisCommand(commandLine);

    if (extracted) {
        return true;
    }

    const f = commandReference.find((item) => {
        return item.name.toLowerCase().search(compact.toLowerCase()) === 0;
    });

    if (f) {
        return true;
    }

    return false;

}
export function isRedisCommand(command: string) {
    const f = commandReference.find((i) => command.toUpperCase() === i.name);

    if (f != null) {
        return true;
    }

    return false;
}
export function compactCommandLine(commandLine: string): string {
    if (!commandLine) {
        return null;
    }

    const rx = new RegExp(/\"[^\"]*\"|\'[^\']*\'|\S+/g);
    const matches = commandLine.match(rx);
    // const c = commandLine.replace(/\s+/g, " ").replace(/^\s*/, "").replace(/\s*$/, "");

    if (!matches || matches.length === 0) {
        return null;
    }
    const c = matches.join(" ");
    if (c.length === 0) {
        return null;
    }
    return c;
}
export function extractRedisCommandArguments(commandLine: string): string[] {

    const c = compactCommandLine(commandLine);
    if (c == null || c.trim() === "") {
        return [];
    }

    const rx = new RegExp(/\"[^\"]*\"|\'[^\']*\'|\S+/g);
    const matches = c.match(rx);
    // const sp = c.split(" ");

    // less than 2 = 0 or 1 first is command so no arguments
    if (!matches || matches.length  < 2) {
        return [];
    }
    const out = matches.slice(1);
    return out;
}
export function extractRedisCommand(commandLine: string): string {
    const c = compactCommandLine(commandLine);

    if (c == null || c.trim() === "") {
        return null;
    }

    const rc = c.split(" ")[0];
    const rx = new RegExp(`^${rc}$`, "i");

    const f = commandReference.find((item) => {
        // return commandLine.toLowerCase().search(item.name.toLowerCase()) === 0;
        return item.name.search(rx) === 0;
    });

    if (!f) {

        return null;
    }

    const command = f.name;

    return command;

}
export const commandReference: CommandReferenceItem[] = [
    {
        "name": "APPEND",
        "args": "key value",
        "summary": "Append a value to a key",
        "url": "https://redis.io/commands/append"
    },
    {
        "name": "AUTH",
        "args": "password",
        "summary": "Authenticate to the server",
        "url": "https://redis.io/commands/auth"
    },
    {
        "name": "BGREWRITEAOF",
        "args": "",
        "summary": "Asynchronously rewrite the append-only file",
        "url": "https://redis.io/commands/bgrewriteaof"
    },
    {
        "name": "BGSAVE",
        "args": "",
        "summary": "Asynchronously save the dataset to disk",
        "url": "https://redis.io/commands/bgsave"
    },
    {
        "name": "BITCOUNT",
        "args": "key [start end]",
        "summary": "Count set bits in a string",
        "url": "https://redis.io/commands/bitcount"
    },
    {
        "name": "BITFIELD",
        "args": "key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]",
        "summary": "Perform arbitrary bitfield integer operations on strings",
        "url": "https://redis.io/commands/bitfield"
    },
    {
        "name": "BITOP",
        "args": "operation destkey key [key ...]",
        "summary": "Perform bitwise operations between strings",
        "url": "https://redis.io/commands/bitop"
    },
    {
        "name": "BITPOS",
        "args": "key bit [start] [end]",
        "summary": "Find first bit set or clear in a string",
        "url": "https://redis.io/commands/bitpos"
    },
    {
        "name": "BLPOP",
        "args": "key [key ...] timeout",
        "summary": "Remove and get the first element in a list, or block until one is available",
        "url": "https://redis.io/commands/blpop"
    },
    {
        "name": "BRPOP",
        "args": "key [key ...] timeout",
        "summary": "Remove and get the last element in a list, or block until one is available",
        "url": "https://redis.io/commands/brpop"
    },
    {
        "name": "BRPOPLPUSH",
        "args": "source destination timeout",
        "summary": "Pop a value from a list, push it to another list and return it; or block until one is available",
        "url": "https://redis.io/commands/brpoplpush"
    },
    {
        "name": "BZPOPMAX",
        "args": "key [key ...] timeout",
        "summary": "Remove and return the member with the highest score from one or more sorted sets, or block until one is available",
        "url": "https://redis.io/commands/bzpopmax"
    },
    {
        "name": "BZPOPMIN",
        "args": "key [key ...] timeout",
        "summary": "Remove and return the member with the lowest score from one or more sorted sets, or block until one is available",
        "url": "https://redis.io/commands/bzpopmin"
    },
    {
        "name": "CLIENT GETNAME",
        "args": "",
        "summary": "Get the current connection name",
        "url": "https://redis.io/commands/client getname"
    },
    {
        "name": "CLIENT KILL",
        "args": "[ip:port] [ID client-id] [TYPE normal|master|slave|pubsub] [ADDR ip:port] [SKIPME yes/no]",
        "summary": "Kill the connection of a client",
        "url": "https://redis.io/commands/client kill"
    },
    {
        "name": "CLIENT LIST",
        "args": "",
        "summary": "Get the list of client connections",
        "url": "https://redis.io/commands/client list"
    },
    {
        "name": "CLIENT PAUSE",
        "args": "timeout",
        "summary": "Stop processing commands from clients for some time",
        "url": "https://redis.io/commands/client pause"
    },
    {
        "name": "CLIENT REPLY",
        "args": "ON|OFF|SKIP",
        "summary": "Instruct the server whether to reply to commands",
        "url": "https://redis.io/commands/client reply"
    },
    {
        "name": "CLIENT SETNAME",
        "args": "connection-name",
        "summary": "Set the current connection name",
        "url": "https://redis.io/commands/client setname"
    },
    {
        "name": "CLUSTER ADDSLOTS",
        "args": "slot [slot ...]",
        "summary": "Assign new hash slots to receiving node",
        "url": "https://redis.io/commands/cluster addslots"
    },
    {
        "name": "CLUSTER COUNT-FAILURE-REPORTS",
        "args": "node-id",
        "summary": "Return the number of failure reports active for a given node",
        "url": "https://redis.io/commands/cluster count-failure-reports"
    },
    {
        "name": "CLUSTER COUNTKEYSINSLOT",
        "args": "slot",
        "summary": "Return the number of local keys in the specified hash slot",
        "url": "https://redis.io/commands/cluster countkeysinslot"
    },
    {
        "name": "CLUSTER DELSLOTS",
        "args": "slot [slot ...]",
        "summary": "Set hash slots as unbound in receiving node",
        "url": "https://redis.io/commands/cluster delslots"
    },
    {
        "name": "CLUSTER FAILOVER",
        "args": "[FORCE|TAKEOVER]",
        "summary": "Forces a slave to perform a manual failover of its master.",
        "url": "https://redis.io/commands/cluster failover"
    },
    {
        "name": "CLUSTER FORGET",
        "args": "node-id",
        "summary": "Remove a node from the nodes table",
        "url": "https://redis.io/commands/cluster forget"
    },
    {
        "name": "CLUSTER GETKEYSINSLOT",
        "args": "slot count",
        "summary": "Return local key names in the specified hash slot",
        "url": "https://redis.io/commands/cluster getkeysinslot"
    },
    {
        "name": "CLUSTER INFO",
        "args": "",
        "summary": "Provides info about Redis Cluster node state",
        "url": "https://redis.io/commands/cluster info"
    },
    {
        "name": "CLUSTER KEYSLOT",
        "args": "key",
        "summary": "Returns the hash slot of the specified key",
        "url": "https://redis.io/commands/cluster keyslot"
    },
    {
        "name": "CLUSTER MEET",
        "args": "ip port",
        "summary": "Force a node cluster to handshake with another node",
        "url": "https://redis.io/commands/cluster meet"
    },
    {
        "name": "CLUSTER NODES",
        "args": "",
        "summary": "Get Cluster config for the node",
        "url": "https://redis.io/commands/cluster nodes"
    },
    {
        "name": "CLUSTER REPLICATE",
        "args": "node-id",
        "summary": "Reconfigure a node as a slave of the specified master node",
        "url": "https://redis.io/commands/cluster replicate"
    },
    {
        "name": "CLUSTER RESET",
        "args": "[HARD|SOFT]",
        "summary": "Reset a Redis Cluster node",
        "url": "https://redis.io/commands/cluster reset"
    },
    {
        "name": "CLUSTER SAVECONFIG",
        "args": "",
        "summary": "Forces the node to save cluster state on disk",
        "url": "https://redis.io/commands/cluster saveconfig"
    },
    {
        "name": "CLUSTER SET-CONFIG-EPOCH",
        "args": "config-epoch",
        "summary": "Set the configuration epoch in a new node",
        "url": "https://redis.io/commands/cluster set-config-epoch"
    },
    {
        "name": "CLUSTER SETSLOT",
        "args": "slot IMPORTING|MIGRATING|STABLE|NODE [node-id]",
        "summary": "Bind a hash slot to a specific node",
        "url": "https://redis.io/commands/cluster setslot"
    },
    {
        "name": "CLUSTER SLAVES",
        "args": "node-id",
        "summary": "List slave nodes of the specified master node",
        "url": "https://redis.io/commands/cluster slaves"
    },
    {
        "name": "CLUSTER SLOTS",
        "args": "",
        "summary": "Get array of Cluster slot to node mappings",
        "url": "https://redis.io/commands/cluster slots"
    },
    {
        "name": "COMMAND",
        "args": "",
        "summary": "Get array of Redis command details",
        "url": "https://redis.io/commands/command"
    },
    {
        "name": "COMMAND COUNT",
        "args": "",
        "summary": "Get total number of Redis commands",
        "url": "https://redis.io/commands/command count"
    },
    {
        "name": "COMMAND GETKEYS",
        "args": "",
        "summary": "Extract keys given a full Redis command",
        "url": "https://redis.io/commands/command getkeys"
    },
    {
        "name": "COMMAND INFO",
        "args": "command-name [command-name ...]",
        "summary": "Get array of specific Redis command details",
        "url": "https://redis.io/commands/command info"
    },
    {
        "name": "CONFIG GET",
        "args": "parameter",
        "summary": "Get the value of a configuration parameter",
        "url": "https://redis.io/commands/config get"
    },
    {
        "name": "CONFIG RESETSTAT",
        "args": "",
        "summary": "Reset the stats returned by INFO",
        "url": "https://redis.io/commands/config resetstat"
    },
    {
        "name": "CONFIG REWRITE",
        "args": "",
        "summary": "Rewrite the configuration file with the in memory configuration",
        "url": "https://redis.io/commands/config rewrite"
    },
    {
        "name": "CONFIG SET",
        "args": "parameter value",
        "summary": "Set a configuration parameter to the given value",
        "url": "https://redis.io/commands/config set"
    },
    {
        "name": "DBSIZE",
        "args": "",
        "summary": "Return the number of keys in the selected database",
        "url": "https://redis.io/commands/dbsize"
    },
    {
        "name": "DEBUG OBJECT",
        "args": "key",
        "summary": "Get debugging information about a key",
        "url": "https://redis.io/commands/debug object"
    },
    {
        "name": "DEBUG SEGFAULT",
        "args": "",
        "summary": "Make the server crash",
        "url": "https://redis.io/commands/debug segfault"
    },
    {
        "name": "DECR",
        "args": "key",
        "summary": "Decrement the integer value of a key by one",
        "url": "https://redis.io/commands/decr"
    },
    {
        "name": "DECRBY",
        "args": "key decrement",
        "summary": "Decrement the integer value of a key by the given number",
        "url": "https://redis.io/commands/decrby"
    },
    {
        "name": "DEL",
        "args": "key [key ...]",
        "summary": "Delete a key",
        "url": "https://redis.io/commands/del"
    },
    {
        "name": "DISCARD",
        "args": "",
        "summary": "Discard all commands issued after MULTI",
        "url": "https://redis.io/commands/discard"
    },
    {
        "name": "DUMP",
        "args": "key",
        "summary": "Return a serialized version of the value stored at the specified key.",
        "url": "https://redis.io/commands/dump"
    },
    {
        "name": "ECHO",
        "args": "message",
        "summary": "Echo the given string",
        "url": "https://redis.io/commands/echo"
    },
    {
        "name": "EVAL",
        "args": "script numkeys key [key ...] arg [arg ...]",
        "summary": "Execute a Lua script server side",
        "url": "https://redis.io/commands/eval"
    },
    {
        "name": "EVALSHA",
        "args": "sha1 numkeys key [key ...] arg [arg ...]",
        "summary": "Execute a Lua script server side",
        "url": "https://redis.io/commands/evalsha"
    },
    {
        "name": "EXEC",
        "args": "",
        "summary": "Execute all commands issued after MULTI",
        "url": "https://redis.io/commands/exec"
    },
    {
        "name": "EXISTS",
        "args": "key [key ...]",
        "summary": "Determine if a key exists",
        "url": "https://redis.io/commands/exists"
    },
    {
        "name": "EXPIRE",
        "args": "key seconds",
        "summary": "Set a key's time to live in seconds",
        "url": "https://redis.io/commands/expire"
    },
    {
        "name": "EXPIREAT",
        "args": "key timestamp",
        "summary": "Set the expiration for a key as a UNIX timestamp",
        "url": "https://redis.io/commands/expireat"
    },
    {
        "name": "FLUSHALL",
        "args": "[ASYNC]",
        "summary": "Remove all keys from all databases",
        "url": "https://redis.io/commands/flushall"
    },
    {
        "name": "FLUSHDB",
        "args": "[ASYNC]",
        "summary": "Remove all keys from the current database",
        "url": "https://redis.io/commands/flushdb"
    },
    {
        "name": "GEOADD",
        "args": "key longitude latitude member [longitude latitude member ...]",
        "summary": "Add one or more geospatial items in the geospatial index represented using a sorted set",
        "url": "https://redis.io/commands/geoadd"
    },
    {
        "name": "GEODIST",
        "args": "key member1 member2 [unit]",
        "summary": "Returns the distance between two members of a geospatial index",
        "url": "https://redis.io/commands/geodist"
    },
    {
        "name": "GEOHASH",
        "args": "key member [member ...]",
        "summary": "Returns members of a geospatial index as standard geohash strings",
        "url": "https://redis.io/commands/geohash"
    },
    {
        "name": "GEOPOS",
        "args": "key member [member ...]",
        "summary": "Returns longitude and latitude of members of a geospatial index",
        "url": "https://redis.io/commands/geopos"
    },
    {
        "name": "GEORADIUS",
        // tslint:disable-next-line:max-line-length
        "args": "key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]",
        "summary": "Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point",
        "url": "https://redis.io/commands/georadius"
    },
    {
        "name": "GEORADIUSBYMEMBER",
        "args": "key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]",
        "summary": "Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member",
        "url": "https://redis.io/commands/georadiusbymember"
    },
    {
        "name": "GET",
        "args": "key",
        "summary": "Get the value of a key",
        "url": "https://redis.io/commands/get"
    },
    {
        "name": "GETBIT",
        "args": "key offset",
        "summary": "Returns the bit value at offset in the string value stored at key",
        "url": "https://redis.io/commands/getbit"
    },
    {
        "name": "GETRANGE",
        "args": "key start end",
        "summary": "Get a substring of the string stored at a key",
        "url": "https://redis.io/commands/getrange"
    },
    {
        "name": "GETSET",
        "args": "key value",
        "summary": "Set the string value of a key and return its old value",
        "url": "https://redis.io/commands/getset"
    },
    {
        "name": "HDEL",
        "args": "key field [field ...]",
        "summary": "Delete one or more hash fields",
        "url": "https://redis.io/commands/hdel"
    },
    {
        "name": "HEXISTS",
        "args": "key field",
        "summary": "Determine if a hash field exists",
        "url": "https://redis.io/commands/hexists"
    },
    {
        "name": "HGET",
        "args": "key field",
        "summary": "Get the value of a hash field",
        "url": "https://redis.io/commands/hget"
    },
    {
        "name": "HGETALL",
        "args": "key",
        "summary": "Get all the fields and values in a hash",
        "url": "https://redis.io/commands/hgetall"
    },
    {
        "name": "HINCRBY",
        "args": "key field increment",
        "summary": "Increment the integer value of a hash field by the given number",
        "url": "https://redis.io/commands/hincrby"
    },
    {
        "name": "HINCRBYFLOAT",
        "args": "key field increment",
        "summary": "Increment the float value of a hash field by the given amount",
        "url": "https://redis.io/commands/hincrbyfloat"
    },
    {
        "name": "HKEYS",
        "args": "key",
        "summary": "Get all the fields in a hash",
        "url": "https://redis.io/commands/hkeys"
    },
    {
        "name": "HLEN",
        "args": "key",
        "summary": "Get the number of fields in a hash",
        "url": "https://redis.io/commands/hlen"
    },
    {
        "name": "HMGET",
        "args": "key field [field ...]",
        "summary": "Get the values of all the given hash fields",
        "url": "https://redis.io/commands/hmget"
    },
    {
        "name": "HMSET",
        "args": "key field value [field value ...]",
        "summary": "Set multiple hash fields to multiple values",
        "url": "https://redis.io/commands/hmset"
    },
    {
        "name": "HSCAN",
        "args": "key cursor [MATCH pattern] [COUNT count]",
        "summary": "Incrementally iterate hash fields and associated values",
        "url": "https://redis.io/commands/hscan"
    },
    {
        "name": "HSET",
        "args": "key field value",
        "summary": "Set the string value of a hash field",
        "url": "https://redis.io/commands/hset"
    },
    {
        "name": "HSETNX",
        "args": "key field value",
        "summary": "Set the value of a hash field, only if the field does not exist",
        "url": "https://redis.io/commands/hsetnx"
    },
    {
        "name": "HSTRLEN",
        "args": "key field",
        "summary": "Get the length of the value of a hash field",
        "url": "https://redis.io/commands/hstrlen"
    },
    {
        "name": "HVALS",
        "args": "key",
        "summary": "Get all the values in a hash",
        "url": "https://redis.io/commands/hvals"
    },
    {
        "name": "INCR",
        "args": "key",
        "summary": "Increment the integer value of a key by one",
        "url": "https://redis.io/commands/incr"
    },
    {
        "name": "INCRBY",
        "args": "key increment",
        "summary": "Increment the integer value of a key by the given amount",
        "url": "https://redis.io/commands/incrby"
    },
    {
        "name": "INCRBYFLOAT",
        "args": "key increment",
        "summary": "Increment the float value of a key by the given amount",
        "url": "https://redis.io/commands/incrbyfloat"
    },
    {
        "name": "INFO",
        "args": "[section]",
        "summary": "Get information and statistics about the server",
        "url": "https://redis.io/commands/info"
    },
    {
        "name": "KEYS",
        "args": "pattern",
        "summary": "Find all keys matching the given pattern",
        "url": "https://redis.io/commands/keys"
    },
    {
        "name": "LASTSAVE",
        "args": "",
        "summary": "Get the UNIX time stamp of the last successful save to disk",
        "url": "https://redis.io/commands/lastsave"
    },
    {
        "name": "LINDEX",
        "args": "key index",
        "summary": "Get an element from a list by its index",
        "url": "https://redis.io/commands/lindex"
    },
    {
        "name": "LINSERT",
        "args": "key BEFORE|AFTER pivot value",
        "summary": "Insert an element before or after another element in a list",
        "url": "https://redis.io/commands/linsert"
    },
    {
        "name": "LLEN",
        "args": "key",
        "summary": "Get the length of a list",
        "url": "https://redis.io/commands/llen"
    },
    {
        "name": "LPOP",
        "args": "key",
        "summary": "Remove and get the first element in a list",
        "url": "https://redis.io/commands/lpop"
    },
    {
        "name": "LPUSH",
        "args": "key value [value ...]",
        "summary": "Prepend one or multiple values to a list",
        "url": "https://redis.io/commands/lpush"
    },
    {
        "name": "LPUSHX",
        "args": "key value",
        "summary": "Prepend a value to a list, only if the list exists",
        "url": "https://redis.io/commands/lpushx"
    },
    {
        "name": "LRANGE",
        "args": "key start stop",
        "summary": "Get a range of elements from a list",
        "url": "https://redis.io/commands/lrange"
    },
    {
        "name": "LREM",
        "args": "key count value",
        "summary": "Remove elements from a list",
        "url": "https://redis.io/commands/lrem"
    },
    {
        "name": "LSET",
        "args": "key index value",
        "summary": "Set the value of an element in a list by its index",
        "url": "https://redis.io/commands/lset"
    },
    {
        "name": "LTRIM",
        "args": "key start stop",
        "summary": "Trim a list to the specified range",
        "url": "https://redis.io/commands/ltrim"
    },
    {
        "name": "MEMORY DOCTOR",
        "args": "",
        "summary": "Outputs memory problems report",
        "url": "https://redis.io/commands/memory doctor"
    },
    {
        "name": "MEMORY HELP",
        "args": "",
        "summary": "Show helpful text about the different subcommands",
        "url": "https://redis.io/commands/memory help"
    },
    {
        "name": "MEMORY MALLOC-STATS",
        "args": "",
        "summary": "Show allocator internal stats",
        "url": "https://redis.io/commands/memory malloc-stats"
    },
    {
        "name": "MEMORY PURGE",
        "args": "",
        "summary": "Ask the allocator to release memory",
        "url": "https://redis.io/commands/memory purge"
    },
    {
        "name": "MEMORY STATS",
        "args": "",
        "summary": "Show memory usage details",
        "url": "https://redis.io/commands/memory stats"
    },
    {
        "name": "MEMORY USAGE",
        "args": "key [SAMPLES count]",
        "summary": "Estimate the memory usage of a key",
        "url": "https://redis.io/commands/memory usage"
    },
    {
        "name": "MGET",
        "args": "key [key ...]",
        "summary": "Get the values of all the given keys",
        "url": "https://redis.io/commands/mget"
    },
    {
        "name": "MIGRATE",
        "args": "host port key|\"\" destination-db timeout [COPY] [REPLACE] [KEYS key [key ...]]",
        "summary": "Atomically transfer a key from a Redis instance to another one.",
        "url": "https://redis.io/commands/migrate"
    },
    {
        "name": "MONITOR",
        "args": "",
        "summary": "Listen for all requests received by the server in real time",
        "url": "https://redis.io/commands/monitor"
    },
    {
        "name": "MOVE",
        "args": "key db",
        "summary": "Move a key to another database",
        "url": "https://redis.io/commands/move"
    },
    {
        "name": "MSET",
        "args": "key value [key value ...]",
        "summary": "Set multiple keys to multiple values",
        "url": "https://redis.io/commands/mset"
    },
    {
        "name": "MSETNX",
        "args": "key value [key value ...]",
        "summary": "Set multiple keys to multiple values, only if none of the keys exist",
        "url": "https://redis.io/commands/msetnx"
    },
    {
        "name": "MULTI",
        "args": "",
        "summary": "Mark the start of a transaction block",
        "url": "https://redis.io/commands/multi"
    },
    {
        "name": "OBJECT",
        "args": "subcommand [arguments [arguments ...]]",
        "summary": "Inspect the internals of Redis objects",
        "url": "https://redis.io/commands/object"
    },
    {
        "name": "PERSIST",
        "args": "key",
        "summary": "Remove the expiration from a key",
        "url": "https://redis.io/commands/persist"
    },
    {
        "name": "PEXPIRE",
        "args": "key milliseconds",
        "summary": "Set a key's time to live in milliseconds",
        "url": "https://redis.io/commands/pexpire"
    },
    {
        "name": "PEXPIREAT",
        "args": "key milliseconds-timestamp",
        "summary": "Set the expiration for a key as a UNIX timestamp specified in milliseconds",
        "url": "https://redis.io/commands/pexpireat"
    },
    {
        "name": "PFADD",
        "args": "key element [element ...]",
        "summary": "Adds the specified elements to the specified HyperLogLog.",
        "url": "https://redis.io/commands/pfadd"
    },
    {
        "name": "PFCOUNT",
        "args": "key [key ...]",
        "summary": "Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).",
        "url": "https://redis.io/commands/pfcount"
    },
    {
        "name": "PFMERGE",
        "args": "destkey sourcekey [sourcekey ...]",
        "summary": "Merge N different HyperLogLogs into a single one.",
        "url": "https://redis.io/commands/pfmerge"
    },
    {
        "name": "PING",
        "args": "[message]",
        "summary": "Ping the server",
        "url": "https://redis.io/commands/ping"
    },
    {
        "name": "PSETEX",
        "args": "key milliseconds value",
        "summary": "Set the value and expiration in milliseconds of a key",
        "url": "https://redis.io/commands/psetex"
    },
    {
        "name": "PSUBSCRIBE",
        "args": "pattern [pattern ...]",
        "summary": "Listen for messages published to channels matching the given patterns",
        "url": "https://redis.io/commands/psubscribe"
    },
    {
        "name": "PTTL",
        "args": "key",
        "summary": "Get the time to live for a key in milliseconds",
        "url": "https://redis.io/commands/pttl"
    },
    {
        "name": "PUBLISH",
        "args": "channel message",
        "summary": "Post a message to a channel",
        "url": "https://redis.io/commands/publish"
    },
    {
        "name": "PUBSUB",
        "args": "subcommand [argument [argument ...]]",
        "summary": "Inspect the state of the Pub/Sub subsystem",
        "url": "https://redis.io/commands/pubsub"
    },
    {
        "name": "PUNSUBSCRIBE",
        "args": "[pattern [pattern ...]]",
        "summary": "Stop listening for messages posted to channels matching the given patterns",
        "url": "https://redis.io/commands/punsubscribe"
    },
    {
        "name": "QUIT",
        "args": "",
        "summary": "Close the connection",
        "url": "https://redis.io/commands/quit"
    },
    {
        "name": "RANDOMKEY",
        "args": "",
        "summary": "Return a random key from the keyspace",
        "url": "https://redis.io/commands/randomkey"
    },
    {
        "name": "READONLY",
        "args": "",
        "summary": "Enables read queries for a connection to a cluster slave node",
        "url": "https://redis.io/commands/readonly"
    },
    {
        "name": "READWRITE",
        "args": "",
        "summary": "Disables read queries for a connection to a cluster slave node",
        "url": "https://redis.io/commands/readwrite"
    },
    {
        "name": "RENAME",
        "args": "key newkey",
        "summary": "Rename a key",
        "url": "https://redis.io/commands/rename"
    },
    {
        "name": "RENAMENX",
        "args": "key newkey",
        "summary": "Rename a key, only if the new key does not exist",
        "url": "https://redis.io/commands/renamenx"
    },
    {
        "name": "RESTORE",
        "args": "key ttl serialized-value [REPLACE]",
        "summary": "Create a key using the provided serialized value, previously obtained using DUMP.",
        "url": "https://redis.io/commands/restore"
    },
    {
        "name": "ROLE",
        "args": "",
        "summary": "Return the role of the instance in the context of replication",
        "url": "https://redis.io/commands/role"
    },
    {
        "name": "RPOP",
        "args": "key",
        "summary": "Remove and get the last element in a list",
        "url": "https://redis.io/commands/rpop"
    },
    {
        "name": "RPOPLPUSH",
        "args": "source destination",
        "summary": "Remove the last element in a list, prepend it to another list and return it",
        "url": "https://redis.io/commands/rpoplpush"
    },
    {
        "name": "RPUSH",
        "args": "key value [value ...]",
        "summary": "Append one or multiple values to a list",
        "url": "https://redis.io/commands/rpush"
    },
    {
        "name": "RPUSHX",
        "args": "key value",
        "summary": "Append a value to a list, only if the list exists",
        "url": "https://redis.io/commands/rpushx"
    },
    {
        "name": "SADD",
        "args": "key member [member ...]",
        "summary": "Add one or more members to a set",
        "url": "https://redis.io/commands/sadd"
    },
    {
        "name": "SAVE",
        "args": "",
        "summary": "Synchronously save the dataset to disk",
        "url": "https://redis.io/commands/save"
    },
    {
        "name": "SCAN",
        "args": "cursor [MATCH pattern] [COUNT count]",
        "summary": "Incrementally iterate the keys space",
        "url": "https://redis.io/commands/scan"
    },
    {
        "name": "SCARD",
        "args": "key",
        "summary": "Get the number of members in a set",
        "url": "https://redis.io/commands/scard"
    },
    {
        "name": "SCRIPT DEBUG",
        "args": "YES|SYNC|NO",
        "summary": "Set the debug mode for executed scripts.",
        "url": "https://redis.io/commands/script debug"
    },
    {
        "name": "SCRIPT EXISTS",
        "args": "sha1 [sha1 ...]",
        "summary": "Check existence of scripts in the script cache.",
        "url": "https://redis.io/commands/script exists"
    },
    {
        "name": "SCRIPT FLUSH",
        "args": "",
        "summary": "Remove all the scripts from the script cache.",
        "url": "https://redis.io/commands/script flush"
    },
    {
        "name": "SCRIPT KILL",
        "args": "",
        "summary": "Kill the script currently in execution.",
        "url": "https://redis.io/commands/script kill"
    },
    {
        "name": "SCRIPT LOAD",
        "args": "script",
        "summary": "Load the specified Lua script into the script cache.",
        "url": "https://redis.io/commands/script load"
    },
    {
        "name": "SDIFF",
        "args": "key [key ...]",
        "summary": "Subtract multiple sets",
        "url": "https://redis.io/commands/sdiff"
    },
    {
        "name": "SDIFFSTORE",
        "args": "destination key [key ...]",
        "summary": "Subtract multiple sets and store the resulting set in a key",
        "url": "https://redis.io/commands/sdiffstore"
    },
    {
        "name": "SELECT",
        "args": "index",
        "summary": "Change the selected database for the current connection",
        "url": "https://redis.io/commands/select"
    },
    {
        "name": "SET",
        "args": "key value [expiration EX seconds|PX milliseconds] [NX|XX]",
        "summary": "Set the string value of a key",
        "url": "https://redis.io/commands/set"
    },
    {
        "name": "SETBIT",
        "args": "key offset value",
        "summary": "Sets or clears the bit at offset in the string value stored at key",
        "url": "https://redis.io/commands/setbit"
    },
    {
        "name": "SETEX",
        "args": "key seconds value",
        "summary": "Set the value and expiration of a key",
        "url": "https://redis.io/commands/setex"
    },
    {
        "name": "SETNX",
        "args": "key value",
        "summary": "Set the value of a key, only if the key does not exist",
        "url": "https://redis.io/commands/setnx"
    },
    {
        "name": "SETRANGE",
        "args": "key offset value",
        "summary": "Overwrite part of a string at key starting at the specified offset",
        "url": "https://redis.io/commands/setrange"
    },
    {
        "name": "SHUTDOWN",
        "args": "[NOSAVE|SAVE]",
        "summary": "Synchronously save the dataset to disk and then shut down the server",
        "url": "https://redis.io/commands/shutdown"
    },
    {
        "name": "SINTER",
        "args": "key [key ...]",
        "summary": "Intersect multiple sets",
        "url": "https://redis.io/commands/sinter"
    },
    {
        "name": "SINTERSTORE",
        "args": "destination key [key ...]",
        "summary": "Intersect multiple sets and store the resulting set in a key",
        "url": "https://redis.io/commands/sinterstore"
    },
    {
        "name": "SISMEMBER",
        "args": "key member",
        "summary": "Determine if a given value is a member of a set",
        "url": "https://redis.io/commands/sismember"
    },
    {
        "name": "SLAVEOF",
        "args": "host port",
        "summary": "Make the server a slave of another instance, or promote it as master",
        "url": "https://redis.io/commands/slaveof"
    },
    {
        "name": "SLOWLOG",
        "args": "subcommand [argument]",
        "summary": "Manages the Redis slow queries log",
        "url": "https://redis.io/commands/slowlog"
    },
    {
        "name": "SMEMBERS",
        "args": "key",
        "summary": "Get all the members in a set",
        "url": "https://redis.io/commands/smembers"
    },
    {
        "name": "SMOVE",
        "args": "source destination member",
        "summary": "Move a member from one set to another",
        "url": "https://redis.io/commands/smove"
    },
    {
        "name": "SORT",
        "args": "key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]",
        "summary": "Sort the elements in a list, set or sorted set",
        "url": "https://redis.io/commands/sort"
    },
    {
        "name": "SPOP",
        "args": "key [count]",
        "summary": "Remove and return one or multiple random members from a set",
        "url": "https://redis.io/commands/spop"
    },
    {
        "name": "SRANDMEMBER",
        "args": "key [count]",
        "summary": "Get one or multiple random members from a set",
        "url": "https://redis.io/commands/srandmember"
    },
    {
        "name": "SREM",
        "args": "key member [member ...]",
        "summary": "Remove one or more members from a set",
        "url": "https://redis.io/commands/srem"
    },
    {
        "name": "SSCAN",
        "args": "key cursor [MATCH pattern] [COUNT count]",
        "summary": "Incrementally iterate Set elements",
        "url": "https://redis.io/commands/sscan"
    },
    {
        "name": "STRLEN",
        "args": "key",
        "summary": "Get the length of the value stored in a key",
        "url": "https://redis.io/commands/strlen"
    },
    {
        "name": "SUBSCRIBE",
        "args": "channel [channel ...]",
        "summary": "Listen for messages published to the given channels",
        "url": "https://redis.io/commands/subscribe"
    },
    {
        "name": "SUNION",
        "args": "key [key ...]",
        "summary": "Add multiple sets",
        "url": "https://redis.io/commands/sunion"
    },
    {
        "name": "SUNIONSTORE",
        "args": "destination key [key ...]",
        "summary": "Add multiple sets and store the resulting set in a key",
        "url": "https://redis.io/commands/sunionstore"
    },
    {
        "name": "SWAPDB",
        "args": "index index",
        "summary": "Swaps two Redis databases",
        "url": "https://redis.io/commands/swapdb"
    },
    {
        "name": "SYNC",
        "args": "",
        "summary": "Internal command used for replication",
        "url": "https://redis.io/commands/sync"
    },
    {
        "name": "TIME",
        "args": "",
        "summary": "Return the current server time",
        "url": "https://redis.io/commands/time"
    },
    {
        "name": "TOUCH",
        "args": "key [key ...]",
        "summary": "Alters the last access time of a key(s). Returns the number of existing keys specified.",
        "url": "https://redis.io/commands/touch"
    },
    {
        "name": "TTL",
        "args": "key",
        "summary": "Get the time to live for a key",
        "url": "https://redis.io/commands/ttl"
    },
    {
        "name": "TYPE",
        "args": "key",
        "summary": "Determine the type stored at key",
        "url": "https://redis.io/commands/type"
    },
    {
        "name": "UNLINK",
        "args": "key [key ...]",
        "summary": "Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.",
        "url": "https://redis.io/commands/unlink"
    },
    {
        "name": "UNSUBSCRIBE",
        "args": "[channel [channel ...]]",
        "summary": "Stop listening for messages posted to the given channels",
        "url": "https://redis.io/commands/unsubscribe"
    },
    {
        "name": "UNWATCH",
        "args": "",
        "summary": "Forget about all watched keys",
        "url": "https://redis.io/commands/unwatch"
    },
    {
        "name": "WAIT",
        "args": "numslaves timeout",
        "summary": "Wait for the synchronous replication of all the write commands sent in the context of the current connection",
        "url": "https://redis.io/commands/wait"
    },
    {
        "name": "WATCH",
        "args": "key [key ...]",
        "summary": "Watch the given keys to determine execution of the MULTI/EXEC block",
        "url": "https://redis.io/commands/watch"
    },
    {
        "name": "XADD",
        "args": "key ID field string [field string ...]",
        "summary": "Appends a new entry to a stream",
        "url": "https://redis.io/commands/xadd"
    },
    {
        "name": "XLEN",
        "args": "key",
        "summary": "Return the number of entires in a stream",
        "url": "https://redis.io/commands/xlen"
    },
    {
        "name": "XPENDING",
        "args": "key group [start end count] [consumer]",
        // tslint:disable-next-line:max-line-length
        "summary": "Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.",
        "url": "https://redis.io/commands/xpending"
    },
    {
        "name": "XRANGE",
        "args": "key start end [COUNT count]",
        "summary": "Return a range of elements in a stream, with IDs matching the specified IDs interval",
        "url": "https://redis.io/commands/xrange"
    },
    {
        "name": "XREAD",
        "args": "[COUNT count] [BLOCK milliseconds] STREAMS key [key ...] ID [ID ...]",
        // tslint:disable-next-line:max-line-length
        "summary": "Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block.",
        "url": "https://redis.io/commands/xread"
    },
    {
        "name": "XREADGROUP",
        "args": "GROUP group consumer [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] ID [ID ...]",
        // tslint:disable-next-line:max-line-length
        "summary": "Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block.",
        "url": "https://redis.io/commands/xreadgroup"
    },
    {
        "name": "XREVRANGE",
        "args": "key end start [COUNT count]",
        // tslint:disable-next-line:max-line-length
        "summary": "Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE",
        "url": "https://redis.io/commands/xrevrange"
    },
    {
        "name": "ZADD",
        "args": "key [NX|XX] [CH] [INCR] score member [score member ...]",
        "summary": "Add one or more members to a sorted set, or update its score if it already exists",
        "url": "https://redis.io/commands/zadd"
    },
    {
        "name": "ZCARD",
        "args": "key",
        "summary": "Get the number of members in a sorted set",
        "url": "https://redis.io/commands/zcard"
    },
    {
        "name": "ZCOUNT",
        "args": "key min max",
        "summary": "Count the members in a sorted set with scores within the given values",
        "url": "https://redis.io/commands/zcount"
    },
    {
        "name": "ZINCRBY",
        "args": "key increment member",
        "summary": "Increment the score of a member in a sorted set",
        "url": "https://redis.io/commands/zincrby"
    },
    {
        "name": "ZINTERSTORE",
        "args": "destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]",
        "summary": "Intersect multiple sorted sets and store the resulting sorted set in a new key",
        "url": "https://redis.io/commands/zinterstore"
    },
    {
        "name": "ZLEXCOUNT",
        "args": "key min max",
        "summary": "Count the number of members in a sorted set between a given lexicographical range",
        "url": "https://redis.io/commands/zlexcount"
    },
    {
        "name": "ZPOPMAX",
        "args": "key [count]",
        "summary": "Remove and return members with the highest scores in a sorted set",
        "url": "https://redis.io/commands/zpopmax"
    },
    {
        "name": "ZPOPMIN",
        "args": "key [count]",
        "summary": "Remove and return members with the lowest scores in a sorted set",
        "url": "https://redis.io/commands/zpopmin"
    },
    {
        "name": "ZRANGE",
        "args": "key start stop [WITHSCORES]",
        "summary": "Return a range of members in a sorted set, by index",
        "url": "https://redis.io/commands/zrange"
    },
    {
        "name": "ZRANGEBYLEX",
        "args": "key min max [LIMIT offset count]",
        "summary": "Return a range of members in a sorted set, by lexicographical range",
        "url": "https://redis.io/commands/zrangebylex"
    },
    {
        "name": "ZRANGEBYSCORE",
        "args": "key min max [WITHSCORES] [LIMIT offset count]",
        "summary": "Return a range of members in a sorted set, by score",
        "url": "https://redis.io/commands/zrangebyscore"
    },
    {
        "name": "ZRANK",
        "args": "key member",
        "summary": "Determine the index of a member in a sorted set",
        "url": "https://redis.io/commands/zrank"
    },
    {
        "name": "ZREM",
        "args": "key member [member ...]",
        "summary": "Remove one or more members from a sorted set",
        "url": "https://redis.io/commands/zrem"
    },
    {
        "name": "ZREMRANGEBYLEX",
        "args": "key min max",
        "summary": "Remove all members in a sorted set between the given lexicographical range",
        "url": "https://redis.io/commands/zremrangebylex"
    },
    {
        "name": "ZREMRANGEBYRANK",
        "args": "key start stop",
        "summary": "Remove all members in a sorted set within the given indexes",
        "url": "https://redis.io/commands/zremrangebyrank"
    },
    {
        "name": "ZREMRANGEBYSCORE",
        "args": "key min max",
        "summary": "Remove all members in a sorted set within the given scores",
        "url": "https://redis.io/commands/zremrangebyscore"
    },
    {
        "name": "ZREVRANGE",
        "args": "key start stop [WITHSCORES]",
        "summary": "Return a range of members in a sorted set, by index, with scores ordered from high to low",
        "url": "https://redis.io/commands/zrevrange"
    },
    {
        "name": "ZREVRANGEBYLEX",
        "args": "key max min [LIMIT offset count]",
        "summary": "Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.",
        "url": "https://redis.io/commands/zrevrangebylex"
    },
    {
        "name": "ZREVRANGEBYSCORE",
        "args": "key max min [WITHSCORES] [LIMIT offset count]",
        "summary": "Return a range of members in a sorted set, by score, with scores ordered from high to low",
        "url": "https://redis.io/commands/zrevrangebyscore"
    },
    {
        "name": "ZREVRANK",
        "args": "key member",
        "summary": "Determine the index of a member in a sorted set, with scores ordered from high to low",
        "url": "https://redis.io/commands/zrevrank"
    },
    {
        "name": "ZSCAN",
        "args": "key cursor [MATCH pattern] [COUNT count]",
        "summary": "Incrementally iterate sorted sets elements and associated scores",
        "url": "https://redis.io/commands/zscan"
    },
    {
        "name": "ZSCORE",
        "args": "key member",
        "summary": "Get the score associated with the given member in a sorted set",
        "url": "https://redis.io/commands/zscore"
    },
    {
        "name": "ZUNIONSTORE",
        "args": "destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]",
        "summary": "Add multiple sorted sets and store the resulting sorted set in a new key",
        "url": "https://redis.io/commands/zunionstore"
    }
];
