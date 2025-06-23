export interface paths {
  "/containers/json": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List containers
     * @description Returns a list of containers. For details on the format, see the
     *     [inspect endpoint](#operation/ContainerInspect).
     *
     *     Note that it uses a different, smaller representation of a container
     *     than inspecting a single container. For example, the list of linked
     *     containers is not propagated .
     *
     */
    get: operations["ContainerList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a container */
    post: operations["ContainerCreate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/json": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Inspect a container
     * @description Return low-level information about a container.
     */
    get: operations["ContainerInspect"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/top": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List processes running inside a container
     * @description On Unix systems, this is done by running the `ps` command. This endpoint
     *     is not supported on Windows.
     *
     */
    get: operations["ContainerTop"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/logs": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get container logs
     * @description Get `stdout` and `stderr` logs from a container.
     *
     *     Note: This endpoint works only for containers with the `json-file` or
     *     `journald` logging driver.
     *
     */
    get: operations["ContainerLogs"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/changes": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get changes on a container’s filesystem
     * @description Returns which files in a container's filesystem have been added, deleted,
     *     or modified. The `Kind` of modification can be one of:
     *
     *     - `0`: Modified ("C")
     *     - `1`: Added ("A")
     *     - `2`: Deleted ("D")
     *
     */
    get: operations["ContainerChanges"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/export": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Export a container
     * @description Export the contents of a container as a tarball.
     */
    get: operations["ContainerExport"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/stats": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get container stats based on resource usage
     * @description This endpoint returns a live stream of a container’s resource usage
     *     statistics.
     *
     *     The `precpu_stats` is the CPU statistic of the *previous* read, and is
     *     used to calculate the CPU usage percentage. It is not an exact copy
     *     of the `cpu_stats` field.
     *
     *     If either `precpu_stats.online_cpus` or `cpu_stats.online_cpus` is
     *     nil then for compatibility with older daemons the length of the
     *     corresponding `cpu_usage.percpu_usage` array should be used.
     *
     *     On a cgroup v2 host, the following fields are not set
     *     * `blkio_stats`: all fields other than `io_service_bytes_recursive`
     *     * `cpu_stats`: `cpu_usage.percpu_usage`
     *     * `memory_stats`: `max_usage` and `failcnt`
     *     Also, `memory_stats.stats` fields are incompatible with cgroup v1.
     *
     *     To calculate the values shown by the `stats` command of the docker cli tool
     *     the following formulas can be used:
     *     * used_memory = `memory_stats.usage - memory_stats.stats.cache`
     *     * available_memory = `memory_stats.limit`
     *     * Memory usage % = `(used_memory / available_memory) * 100.0`
     *     * cpu_delta = `cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage`
     *     * system_cpu_delta = `cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage`
     *     * number_cpus = `length(cpu_stats.cpu_usage.percpu_usage)` or `cpu_stats.online_cpus`
     *     * CPU usage % = `(cpu_delta / system_cpu_delta) * number_cpus * 100.0`
     *
     */
    get: operations["ContainerStats"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/resize": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Resize a container TTY
     * @description Resize the TTY for a container.
     */
    post: operations["ContainerResize"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/start": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Start a container */
    post: operations["ContainerStart"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/stop": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Stop a container */
    post: operations["ContainerStop"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/restart": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Restart a container */
    post: operations["ContainerRestart"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/kill": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Kill a container
     * @description Send a POSIX signal to a container, defaulting to killing to the
     *     container.
     *
     */
    post: operations["ContainerKill"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/update": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Update a container
     * @description Change various configuration options of a container without having to
     *     recreate it.
     *
     */
    post: operations["ContainerUpdate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/rename": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Rename a container */
    post: operations["ContainerRename"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/pause": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Pause a container
     * @description Use the freezer cgroup to suspend all processes in a container.
     *
     *     Traditionally, when suspending a process the `SIGSTOP` signal is used,
     *     which is observable by the process being suspended. With the freezer
     *     cgroup the process is unaware, and unable to capture, that it is being
     *     suspended, and subsequently resumed.
     *
     */
    post: operations["ContainerPause"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/unpause": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Unpause a container
     * @description Resume a container which has been paused.
     */
    post: operations["ContainerUnpause"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/attach": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Attach to a container
     * @description Attach to a container to read its output or send it input. You can attach
     *     to the same container multiple times and you can reattach to containers
     *     that have been detached.
     *
     *     Either the `stream` or `logs` parameter must be `true` for this endpoint
     *     to do anything.
     *
     *     See the [documentation for the `docker attach` command](https://docs.docker.com/engine/reference/commandline/attach/)
     *     for more details.
     *
     *     ### Hijacking
     *
     *     This endpoint hijacks the HTTP connection to transport `stdin`, `stdout`,
     *     and `stderr` on the same socket.
     *
     *     This is the response from the daemon for an attach request:
     *
     *     ```
     *     HTTP/1.1 200 OK
     *     Content-Type: application/vnd.docker.raw-stream
     *
     *     [STREAM]
     *     ```
     *
     *     After the headers and two new lines, the TCP connection can now be used
     *     for raw, bidirectional communication between the client and server.
     *
     *     To hint potential proxies about connection hijacking, the Docker client
     *     can also optionally send connection upgrade headers.
     *
     *     For example, the client sends this request to upgrade the connection:
     *
     *     ```
     *     POST /containers/16253994b7c4/attach?stream=1&stdout=1 HTTP/1.1
     *     Upgrade: tcp
     *     Connection: Upgrade
     *     ```
     *
     *     The Docker daemon will respond with a `101 UPGRADED` response, and will
     *     similarly follow with the raw stream:
     *
     *     ```
     *     HTTP/1.1 101 UPGRADED
     *     Content-Type: application/vnd.docker.raw-stream
     *     Connection: Upgrade
     *     Upgrade: tcp
     *
     *     [STREAM]
     *     ```
     *
     *     ### Stream format
     *
     *     When the TTY setting is disabled in [`POST /containers/create`](#operation/ContainerCreate),
     *     the HTTP Content-Type header is set to application/vnd.docker.multiplexed-stream
     *     and the stream over the hijacked connected is multiplexed to separate out
     *     `stdout` and `stderr`. The stream consists of a series of frames, each
     *     containing a header and a payload.
     *
     *     The header contains the information which the stream writes (`stdout` or
     *     `stderr`). It also contains the size of the associated frame encoded in
     *     the last four bytes (`uint32`).
     *
     *     It is encoded on the first eight bytes like this:
     *
     *     ```go
     *     header := [8]byte{STREAM_TYPE, 0, 0, 0, SIZE1, SIZE2, SIZE3, SIZE4}
     *     ```
     *
     *     `STREAM_TYPE` can be:
     *
     *     - 0: `stdin` (is written on `stdout`)
     *     - 1: `stdout`
     *     - 2: `stderr`
     *
     *     `SIZE1, SIZE2, SIZE3, SIZE4` are the four bytes of the `uint32` size
     *     encoded as big endian.
     *
     *     Following the header is the payload, which is the specified number of
     *     bytes of `STREAM_TYPE`.
     *
     *     The simplest way to implement this protocol is the following:
     *
     *     1. Read 8 bytes.
     *     2. Choose `stdout` or `stderr` depending on the first byte.
     *     3. Extract the frame size from the last four bytes.
     *     4. Read the extracted size and output it on the correct output.
     *     5. Goto 1.
     *
     *     ### Stream format when using a TTY
     *
     *     When the TTY setting is enabled in [`POST /containers/create`](#operation/ContainerCreate),
     *     the stream is not multiplexed. The data exchanged over the hijacked
     *     connection is simply the raw data from the process PTY and client's
     *     `stdin`.
     *
     */
    post: operations["ContainerAttach"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/attach/ws": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Attach to a container via a websocket */
    get: operations["ContainerAttachWebsocket"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/wait": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Wait for a container
     * @description Block until a container stops, then returns the exit code.
     */
    post: operations["ContainerWait"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /** Remove a container */
    delete: operations["ContainerDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/archive": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get an archive of a filesystem resource in a container
     * @description Get a tar archive of a resource in the filesystem of container id.
     */
    get: operations["ContainerArchive"];
    /**
     * Extract an archive of files or folders to a directory in a container
     * @description Upload a tar archive to be extracted to a path in the filesystem of container id.
     *     `path` parameter is asserted to be a directory. If it exists as a file, 400 error
     *     will be returned with message "not a directory".
     *
     */
    put: operations["PutContainerArchive"];
    post?: never;
    delete?: never;
    options?: never;
    /**
     * Get information about files in a container
     * @description A response header `X-Docker-Container-Path-Stat` is returned, containing
     *     a base64 - encoded JSON object with some filesystem header information
     *     about the path.
     *
     */
    head: operations["ContainerArchiveInfo"];
    patch?: never;
    trace?: never;
  };
  "/containers/prune": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Delete stopped containers */
    post: operations["ContainerPrune"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/json": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List Images
     * @description Returns a list of images on the server. Note that it uses a different, smaller representation of an image than inspecting a single image.
     */
    get: operations["ImageList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/build": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Build an image
     * @description Build an image from a tar archive with a `Dockerfile` in it.
     *
     *     The `Dockerfile` specifies how the image is built from the tar archive. It is typically in the archive's root, but can be at a different path or have a different name by specifying the `dockerfile` parameter. [See the `Dockerfile` reference for more information](https://docs.docker.com/engine/reference/builder/).
     *
     *     The Docker daemon performs a preliminary validation of the `Dockerfile` before starting the build, and returns an error if the syntax is incorrect. After that, each instruction is run one-by-one until the ID of the new image is output.
     *
     *     The build is canceled if the client drops the connection by quitting or being killed.
     *
     */
    post: operations["ImageBuild"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/build/prune": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Delete builder cache */
    post: operations["BuildPrune"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Create an image
     * @description Pull or import an image.
     */
    post: operations["ImageCreate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/{name}/json": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Inspect an image
     * @description Return low-level information about an image.
     */
    get: operations["ImageInspect"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/{name}/history": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get the history of an image
     * @description Return parent layers of an image.
     */
    get: operations["ImageHistory"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/{name}/push": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Push an image
     * @description Push an image to a registry.
     *
     *     If you wish to push an image on to a private registry, that image must
     *     already have a tag which references the registry. For example,
     *     `registry.example.com/myimage:latest`.
     *
     *     The push is cancelled if the HTTP connection is closed.
     *
     */
    post: operations["ImagePush"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/{name}/tag": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Tag an image
     * @description Tag an image so that it becomes part of a repository.
     */
    post: operations["ImageTag"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /**
     * Remove an image
     * @description Remove an image, along with any untagged parent images that were
     *     referenced by that image.
     *
     *     Images can't be removed if they have descendant images, are being
     *     used by a running container or are being used by a build.
     *
     */
    delete: operations["ImageDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search images
     * @description Search for an image on Docker Hub.
     */
    get: operations["ImageSearch"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/prune": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Delete unused images */
    post: operations["ImagePrune"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Check auth configuration
     * @description Validate credentials for a registry and, if available, get an identity
     *     token for accessing the registry without password.
     *
     */
    post: operations["SystemAuth"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/info": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get system information */
    get: operations["SystemInfo"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/version": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get version
     * @description Returns the version of Docker that is running and various information about the system that Docker is running on.
     */
    get: operations["SystemVersion"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/_ping": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Ping
     * @description This is a dummy endpoint you can use to test if the server is accessible.
     */
    get: operations["SystemPing"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    /**
     * Ping
     * @description This is a dummy endpoint you can use to test if the server is accessible.
     */
    head: operations["SystemPingHead"];
    patch?: never;
    trace?: never;
  };
  "/commit": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a new image from a container */
    post: operations["ImageCommit"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/events": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Monitor events
     * @description Stream real-time events from the server.
     *
     *     Various objects within Docker report events when something happens to them.
     *
     *     Containers report these events: `attach`, `commit`, `copy`, `create`, `destroy`, `detach`, `die`, `exec_create`, `exec_detach`, `exec_start`, `exec_die`, `export`, `health_status`, `kill`, `oom`, `pause`, `rename`, `resize`, `restart`, `start`, `stop`, `top`, `unpause`, `update`, and `prune`
     *
     *     Images report these events: `create`, `delete`, `import`, `load`, `pull`, `push`, `save`, `tag`, `untag`, and `prune`
     *
     *     Volumes report these events: `create`, `mount`, `unmount`, `destroy`, and `prune`
     *
     *     Networks report these events: `create`, `connect`, `disconnect`, `destroy`, `update`, `remove`, and `prune`
     *
     *     The Docker daemon reports these events: `reload`
     *
     *     Services report these events: `create`, `update`, and `remove`
     *
     *     Nodes report these events: `create`, `update`, and `remove`
     *
     *     Secrets report these events: `create`, `update`, and `remove`
     *
     *     Configs report these events: `create`, `update`, and `remove`
     *
     *     The Builder reports `prune` events
     *
     */
    get: operations["SystemEvents"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/system/df": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get data usage information */
    get: operations["SystemDataUsage"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/{name}/get": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Export an image
     * @description Get a tarball containing all images and metadata for a repository.
     *
     *     If `name` is a specific name and tag (e.g. `ubuntu:latest`), then only that image (and its parents) are returned. If `name` is an image ID, similarly only that image (and its parents) are returned, but with the exclusion of the `repositories` file in the tarball, as there were no image names referenced.
     *
     *     ### Image tarball format
     *
     *     An image tarball contains [Content as defined in the OCI Image Layout Specification](https://github.com/opencontainers/image-spec/blob/v1.1.1/image-layout.md#content).
     *
     *     Additionally, includes the manifest.json file associated with a backwards compatible docker save format.
     *
     *     If the tarball defines a repository, the tarball should also include a `repositories` file at the root that contains a list of repository and tag names mapped to layer IDs.
     *
     *     ```json
     *     {
     *       "hello-world": {
     *         "latest": "565a9d68a73f6706862bfe8409a7f659776d4d60a8d096eb4a3cbce6999cc2a1"
     *       }
     *     }
     *     ```
     *
     */
    get: operations["ImageGet"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/get": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Export several images
     * @description Get a tarball containing all images and metadata for several image
     *     repositories.
     *
     *     For each value of the `names` parameter: if it is a specific name and
     *     tag (e.g. `ubuntu:latest`), then only that image (and its parents) are
     *     returned; if it is an image ID, similarly only that image (and its parents)
     *     are returned and there would be no names referenced in the 'repositories'
     *     file for this image ID.
     *
     *     For details on the format, see the [export image endpoint](#operation/ImageGet).
     *
     */
    get: operations["ImageGetAll"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/images/load": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Import images
     * @description Load a set of images and tags into a repository.
     *
     *     For details on the format, see the [export image endpoint](#operation/ImageGet).
     *
     */
    post: operations["ImageLoad"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/containers/{id}/exec": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Create an exec instance
     * @description Run a command inside a running container.
     */
    post: operations["ContainerExec"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/exec/{id}/start": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Start an exec instance
     * @description Starts a previously set up exec instance. If detach is true, this endpoint
     *     returns immediately after starting the command. Otherwise, it sets up an
     *     interactive session with the command.
     *
     */
    post: operations["ExecStart"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/exec/{id}/resize": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Resize an exec instance
     * @description Resize the TTY session used by an exec instance. This endpoint only works
     *     if `tty` was specified as part of creating and starting the exec instance.
     *
     */
    post: operations["ExecResize"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/exec/{id}/json": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Inspect an exec instance
     * @description Return low-level information about an exec instance.
     */
    get: operations["ExecInspect"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/volumes": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List volumes */
    get: operations["VolumeList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/volumes/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a volume */
    post: operations["VolumeCreate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/volumes/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect a volume */
    get: operations["VolumeInspect"];
    /** "Update a volume. Valid only for Swarm cluster volumes"
     *      */
    put: operations["VolumeUpdate"];
    post?: never;
    /**
     * Remove a volume
     * @description Instruct the driver to remove the volume.
     */
    delete: operations["VolumeDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/volumes/prune": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Delete unused volumes */
    post: operations["VolumePrune"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/networks": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List networks
     * @description Returns a list of networks. For details on the format, see the
     *     [network inspect endpoint](#operation/NetworkInspect).
     *
     *     Note that it uses a different, smaller representation of a network than
     *     inspecting a single network. For example, the list of containers attached
     *     to the network is not propagated in API versions 1.28 and up.
     *
     */
    get: operations["NetworkList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/networks/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect a network */
    get: operations["NetworkInspect"];
    put?: never;
    post?: never;
    /** Remove a network */
    delete: operations["NetworkDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/networks/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a network */
    post: operations["NetworkCreate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/networks/{id}/connect": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Connect a container to a network
     * @description The network must be either a local-scoped network or a swarm-scoped network with the `attachable` option set. A network cannot be re-attached to a running container
     */
    post: operations["NetworkConnect"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/networks/{id}/disconnect": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Disconnect a container from a network */
    post: operations["NetworkDisconnect"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/networks/prune": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Delete unused networks */
    post: operations["NetworkPrune"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List plugins
     * @description Returns information about installed plugins.
     */
    get: operations["PluginList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/privileges": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get plugin privileges */
    get: operations["GetPluginPrivileges"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/pull": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Install a plugin
     * @description Pulls and installs a plugin. After the plugin is installed, it can be
     *     enabled using the [`POST /plugins/{name}/enable` endpoint](#operation/PostPluginsEnable).
     *
     */
    post: operations["PluginPull"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/{name}/json": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect a plugin */
    get: operations["PluginInspect"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /** Remove a plugin */
    delete: operations["PluginDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/{name}/enable": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Enable a plugin */
    post: operations["PluginEnable"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/{name}/disable": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Disable a plugin */
    post: operations["PluginDisable"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/{name}/upgrade": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Upgrade a plugin */
    post: operations["PluginUpgrade"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a plugin */
    post: operations["PluginCreate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/{name}/push": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Push a plugin
     * @description Push a plugin to the registry.
     *
     */
    post: operations["PluginPush"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/plugins/{name}/set": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Configure a plugin */
    post: operations["PluginSet"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nodes": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List nodes */
    get: operations["NodeList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nodes/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect a node */
    get: operations["NodeInspect"];
    put?: never;
    post?: never;
    /** Delete a node */
    delete: operations["NodeDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/nodes/{id}/update": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Update a node */
    post: operations["NodeUpdate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/swarm": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect swarm */
    get: operations["SwarmInspect"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/swarm/init": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Initialize a new swarm */
    post: operations["SwarmInit"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/swarm/join": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Join an existing swarm */
    post: operations["SwarmJoin"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/swarm/leave": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Leave a swarm */
    post: operations["SwarmLeave"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/swarm/update": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Update a swarm */
    post: operations["SwarmUpdate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/swarm/unlockkey": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get the unlock key */
    get: operations["SwarmUnlockkey"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/swarm/unlock": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Unlock a locked manager */
    post: operations["SwarmUnlock"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/services": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List services */
    get: operations["ServiceList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/services/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a service */
    post: operations["ServiceCreate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/services/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect a service */
    get: operations["ServiceInspect"];
    put?: never;
    post?: never;
    /** Delete a service */
    delete: operations["ServiceDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/services/{id}/update": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Update a service */
    post: operations["ServiceUpdate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/services/{id}/logs": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get service logs
     * @description Get `stdout` and `stderr` logs from a service. See also
     *     [`/containers/{id}/logs`](#operation/ContainerLogs).
     *
     *     **Note**: This endpoint works only for services with the `local`,
     *     `json-file` or `journald` logging drivers.
     *
     */
    get: operations["ServiceLogs"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/tasks": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List tasks */
    get: operations["TaskList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/tasks/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect a task */
    get: operations["TaskInspect"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/tasks/{id}/logs": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get task logs
     * @description Get `stdout` and `stderr` logs from a task.
     *     See also [`/containers/{id}/logs`](#operation/ContainerLogs).
     *
     *     **Note**: This endpoint works only for services with the `local`,
     *     `json-file` or `journald` logging drivers.
     *
     */
    get: operations["TaskLogs"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/secrets": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List secrets */
    get: operations["SecretList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/secrets/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a secret */
    post: operations["SecretCreate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/secrets/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect a secret */
    get: operations["SecretInspect"];
    put?: never;
    post?: never;
    /** Delete a secret */
    delete: operations["SecretDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/secrets/{id}/update": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Update a Secret */
    post: operations["SecretUpdate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/configs": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List configs */
    get: operations["ConfigList"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/configs/create": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a config */
    post: operations["ConfigCreate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/configs/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Inspect a config */
    get: operations["ConfigInspect"];
    put?: never;
    post?: never;
    /** Delete a config */
    delete: operations["ConfigDelete"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/configs/{id}/update": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Update a Config */
    post: operations["ConfigUpdate"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/distribution/{name}/json": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get image information from the registry
     * @description Return image digest and platform information by contacting the registry.
     *
     */
    get: operations["DistributionInspect"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/session": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Initialize interactive session
     * @description Start a new interactive session with a server. Session allows server to
     *     call back to the client for advanced capabilities.
     *
     *     ### Hijacking
     *
     *     This endpoint hijacks the HTTP connection to HTTP2 transport that allows
     *     the client to expose gPRC services on that connection.
     *
     *     For example, the client sends this request to upgrade the connection:
     *
     *     ```
     *     POST /session HTTP/1.1
     *     Upgrade: h2c
     *     Connection: Upgrade
     *     ```
     *
     *     The Docker daemon responds with a `101 UPGRADED` response follow with
     *     the raw stream:
     *
     *     ```
     *     HTTP/1.1 101 UPGRADED
     *     Connection: Upgrade
     *     Upgrade: h2c
     *     ```
     *
     */
    post: operations["Session"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /**
     * @description An open port on a container
     * @example {
     *       "PrivatePort": 8080,
     *       "PublicPort": 80,
     *       "Type": "tcp"
     *     }
     */
    Port: {
      /**
       * Format: ip-address
       * @description Host IP address that the container's port is mapped to
       */
      IP?: string;
      /**
       * Format: uint16
       * @description Port on the container
       */
      PrivatePort: number;
      /**
       * Format: uint16
       * @description Port exposed on the host
       */
      PublicPort?: number;
      /** @enum {string} */
      Type: "tcp" | "udp" | "sctp";
    };
    /** @description MountPoint represents a mount point configuration inside the container.
     *     This is used for reporting the mountpoints in use by a container.
     *      */
    MountPoint: {
      /**
       * @description The mount type:
       *
       *     - `bind` a mount of a file or directory from the host into the container.
       *     - `volume` a docker volume with the given `Name`.
       *     - `image` a docker image
       *     - `tmpfs` a `tmpfs`.
       *     - `npipe` a named pipe from the host into the container.
       *     - `cluster` a Swarm cluster volume
       *
       * @example volume
       * @enum {string}
       */
      Type?: "bind" | "volume" | "image" | "tmpfs" | "npipe" | "cluster";
      /**
       * @description Name is the name reference to the underlying data defined by `Source`
       *     e.g., the volume name.
       *
       * @example myvolume
       */
      Name?: string;
      /**
       * @description Source location of the mount.
       *
       *     For volumes, this contains the storage location of the volume (within
       *     `/var/lib/docker/volumes/`). For bind-mounts, and `npipe`, this contains
       *     the source (host) part of the bind-mount. For `tmpfs` mount points, this
       *     field is empty.
       *
       * @example /var/lib/docker/volumes/myvolume/_data
       */
      Source?: string;
      /**
       * @description Destination is the path relative to the container root (`/`) where
       *     the `Source` is mounted inside the container.
       *
       * @example /usr/share/nginx/html/
       */
      Destination?: string;
      /**
       * @description Driver is the volume driver used to create the volume (if it is a volume).
       *
       * @example local
       */
      Driver?: string;
      /**
       * @description Mode is a comma separated list of options supplied by the user when
       *     creating the bind/volume mount.
       *
       *     The default is platform-specific (`"z"` on Linux, empty on Windows).
       *
       * @example z
       */
      Mode?: string;
      /**
       * @description Whether the mount is mounted writable (read-write).
       *
       * @example true
       */
      RW?: boolean;
      /**
       * @description Propagation describes how mounts are propagated from the host into the
       *     mount point, and vice-versa. Refer to the [Linux kernel documentation](https://www.kernel.org/doc/Documentation/filesystems/sharedsubtree.txt)
       *     for details. This field is not used on Windows.
       *
       * @example
       */
      Propagation?: string;
    };
    /**
     * @description A device mapping between the host and container
     * @example {
     *       "PathOnHost": "/dev/deviceName",
     *       "PathInContainer": "/dev/deviceName",
     *       "CgroupPermissions": "mrw"
     *     }
     */
    DeviceMapping: {
      PathOnHost?: string;
      PathInContainer?: string;
      CgroupPermissions?: string;
    };
    /** @description A request for devices to be sent to device drivers */
    DeviceRequest: {
      /** @example nvidia */
      Driver?: string;
      /** @example -1 */
      Count?: number;
      /** @example [
       *       "0",
       *       "1",
       *       "GPU-fef8089b-4820-abfc-e83e-94318197576e"
       *     ] */
      DeviceIDs?: string[];
      /**
       * @description A list of capabilities; an OR list of AND lists of capabilities.
       *
       * @example [
       *       [
       *         "gpu",
       *         "nvidia",
       *         "compute"
       *       ]
       *     ]
       */
      Capabilities?: string[][];
      /** @description Driver-specific options, specified as a key/value pairs. These options
       *     are passed directly to the driver.
       *      */
      Options?: {
        [key: string]: string;
      };
    };
    ThrottleDevice: {
      /** @description Device path */
      Path?: string;
      /**
       * Format: int64
       * @description Rate
       */
      Rate?: number;
    };
    Mount: {
      /** @description Container path. */
      Target?: string;
      /** @description Mount source (e.g. a volume name, a host path). */
      Source?: string;
      /**
       * @description The mount type. Available types:
       *
       *     - `bind` Mounts a file or directory from the host into the container. Must exist prior to creating the container.
       *     - `volume` Creates a volume with the given name and options (or uses a pre-existing volume with the same name and options). These are **not** removed when the container is removed.
       *     - `image` Mounts an image.
       *     - `tmpfs` Create a tmpfs with the given options. The mount source cannot be specified for tmpfs.
       *     - `npipe` Mounts a named pipe from the host into the container. Must exist prior to creating the container.
       *     - `cluster` a Swarm cluster volume
       *
       * @enum {string}
       */
      Type?: "bind" | "volume" | "image" | "tmpfs" | "npipe" | "cluster";
      /** @description Whether the mount should be read-only. */
      ReadOnly?: boolean;
      /** @description The consistency requirement for the mount: `default`, `consistent`, `cached`, or `delegated`. */
      Consistency?: string;
      /** @description Optional configuration for the `bind` type. */
      BindOptions?: {
        /**
         * @description A propagation mode with the value `[r]private`, `[r]shared`, or `[r]slave`.
         * @enum {string}
         */
        Propagation?:
          | "private"
          | "rprivate"
          | "shared"
          | "rshared"
          | "slave"
          | "rslave";
        /**
         * @description Disable recursive bind mount.
         * @default false
         */
        NonRecursive: boolean;
        /**
         * @description Create mount point on host if missing
         * @default false
         */
        CreateMountpoint: boolean;
        /**
         * @description Make the mount non-recursively read-only, but still leave the mount recursive
         *     (unless NonRecursive is set to `true` in conjunction).
         *
         *     Added in v1.44, before that version all read-only mounts were
         *     non-recursive by default. To match the previous behaviour this
         *     will default to `true` for clients on versions prior to v1.44.
         *
         * @default false
         */
        ReadOnlyNonRecursive: boolean;
        /**
         * @description Raise an error if the mount cannot be made recursively read-only.
         * @default false
         */
        ReadOnlyForceRecursive: boolean;
      };
      /** @description Optional configuration for the `volume` type. */
      VolumeOptions?: {
        /**
         * @description Populate volume with data from the target.
         * @default false
         */
        NoCopy: boolean;
        /** @description User-defined key/value metadata. */
        Labels?: {
          [key: string]: string;
        };
        /** @description Map of driver specific options */
        DriverConfig?: {
          /** @description Name of the driver to use to create the volume. */
          Name?: string;
          /** @description key/value map of driver specific options. */
          Options?: {
            [key: string]: string;
          };
        };
        /**
         * @description Source path inside the volume. Must be relative without any back traversals.
         * @example dir-inside-volume/subdirectory
         */
        Subpath?: string;
      };
      /** @description Optional configuration for the `image` type. */
      ImageOptions?: {
        /**
         * @description Source path inside the image. Must be relative without any back traversals.
         * @example dir-inside-image/subdirectory
         */
        Subpath?: string;
      };
      /** @description Optional configuration for the `tmpfs` type. */
      TmpfsOptions?: {
        /**
         * Format: int64
         * @description The size for the tmpfs mount in bytes.
         */
        SizeBytes?: number;
        /** @description The permission mode for the tmpfs mount in an integer. */
        Mode?: number;
        /**
         * @description The options to be passed to the tmpfs mount. An array of arrays.
         *     Flag options should be provided as 1-length arrays. Other types
         *     should be provided as as 2-length arrays, where the first item is
         *     the key and the second the value.
         *
         * @example [
         *       [
         *         "noexec"
         *       ]
         *     ]
         */
        Options?: string[][];
      };
    };
    /** @description The behavior to apply when the container exits. The default is not to
     *     restart.
     *
     *     An ever increasing delay (double the previous delay, starting at 100ms) is
     *     added before each restart to prevent flooding the server.
     *      */
    RestartPolicy: {
      /**
       * @description - Empty string means not to restart
       *     - `no` Do not automatically restart
       *     - `always` Always restart
       *     - `unless-stopped` Restart always except when the user has manually stopped the container
       *     - `on-failure` Restart only when the container exit code is non-zero
       *
       * @enum {string}
       */
      Name?: "" | "no" | "always" | "unless-stopped" | "on-failure";
      /** @description If `on-failure` is used, the number of times to retry before giving up.
       *      */
      MaximumRetryCount?: number;
    };
    /** @description A container's resources (cgroups config, ulimits, etc) */
    Resources: {
      /** @description An integer value representing this container's relative CPU weight
       *     versus other containers.
       *      */
      CpuShares?: number;
      /**
       * Format: int64
       * @description Memory limit in bytes.
       * @default 0
       */
      Memory: number;
      /** @description Path to `cgroups` under which the container's `cgroup` is created. If
       *     the path is not absolute, the path is considered to be relative to the
       *     `cgroups` path of the init process. Cgroups are created if they do not
       *     already exist.
       *      */
      CgroupParent?: string;
      /** @description Block IO weight (relative weight). */
      BlkioWeight?: number;
      /** @description Block IO weight (relative device weight) in the form:
       *
       *     ```
       *     [{"Path": "device_path", "Weight": weight}]
       *     ```
       *      */
      BlkioWeightDevice?: {
        Path?: string;
        Weight?: number;
      }[];
      /** @description Limit read rate (bytes per second) from a device, in the form:
       *
       *     ```
       *     [{"Path": "device_path", "Rate": rate}]
       *     ```
       *      */
      BlkioDeviceReadBps?: components["schemas"]["ThrottleDevice"][];
      /** @description Limit write rate (bytes per second) to a device, in the form:
       *
       *     ```
       *     [{"Path": "device_path", "Rate": rate}]
       *     ```
       *      */
      BlkioDeviceWriteBps?: components["schemas"]["ThrottleDevice"][];
      /** @description Limit read rate (IO per second) from a device, in the form:
       *
       *     ```
       *     [{"Path": "device_path", "Rate": rate}]
       *     ```
       *      */
      BlkioDeviceReadIOps?: components["schemas"]["ThrottleDevice"][];
      /** @description Limit write rate (IO per second) to a device, in the form:
       *
       *     ```
       *     [{"Path": "device_path", "Rate": rate}]
       *     ```
       *      */
      BlkioDeviceWriteIOps?: components["schemas"]["ThrottleDevice"][];
      /**
       * Format: int64
       * @description The length of a CPU period in microseconds.
       */
      CpuPeriod?: number;
      /**
       * Format: int64
       * @description Microseconds of CPU time that the container can get in a CPU period.
       *
       */
      CpuQuota?: number;
      /**
       * Format: int64
       * @description The length of a CPU real-time period in microseconds. Set to 0 to
       *     allocate no time allocated to real-time tasks.
       *
       */
      CpuRealtimePeriod?: number;
      /**
       * Format: int64
       * @description The length of a CPU real-time runtime in microseconds. Set to 0 to
       *     allocate no time allocated to real-time tasks.
       *
       */
      CpuRealtimeRuntime?: number;
      /**
       * @description CPUs in which to allow execution (e.g., `0-3`, `0,1`).
       *
       * @example 0-3
       */
      CpusetCpus?: string;
      /** @description Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only
       *     effective on NUMA systems.
       *      */
      CpusetMems?: string;
      /** @description A list of devices to add to the container. */
      Devices?: components["schemas"]["DeviceMapping"][];
      /** @description a list of cgroup rules to apply to the container */
      DeviceCgroupRules?: string[];
      /** @description A list of requests for devices to be sent to device drivers.
       *      */
      DeviceRequests?: components["schemas"]["DeviceRequest"][];
      /**
       * Format: int64
       * @description Hard limit for kernel TCP buffer memory (in bytes). Depending on the
       *     OCI runtime in use, this option may be ignored. It is no longer supported
       *     by the default (runc) runtime.
       *
       *     This field is omitted when empty.
       *
       */
      KernelMemoryTCP?: number;
      /**
       * Format: int64
       * @description Memory soft limit in bytes.
       */
      MemoryReservation?: number;
      /**
       * Format: int64
       * @description Total memory limit (memory + swap). Set as `-1` to enable unlimited
       *     swap.
       *
       */
      MemorySwap?: number;
      /**
       * Format: int64
       * @description Tune a container's memory swappiness behavior. Accepts an integer
       *     between 0 and 100.
       *
       */
      MemorySwappiness?: number;
      /**
       * Format: int64
       * @description CPU quota in units of 10<sup>-9</sup> CPUs.
       */
      NanoCpus?: number;
      /** @description Disable OOM Killer for the container. */
      OomKillDisable?: boolean;
      /** @description Run an init inside the container that forwards signals and reaps
       *     processes. This field is omitted if empty, and the default (as
       *     configured on the daemon) is used.
       *      */
      Init?: boolean | null;
      /**
       * Format: int64
       * @description Tune a container's PIDs limit. Set `0` or `-1` for unlimited, or `null`
       *     to not change.
       *
       */
      PidsLimit?: number | null;
      /** @description A list of resource limits to set in the container. For example:
       *
       *     ```
       *     {"Name": "nofile", "Soft": 1024, "Hard": 2048}
       *     ```
       *      */
      Ulimits?: {
        /** @description Name of ulimit */
        Name?: string;
        /** @description Soft limit */
        Soft?: number;
        /** @description Hard limit */
        Hard?: number;
      }[];
      /**
       * Format: int64
       * @description The number of usable CPUs (Windows only).
       *
       *     On Windows Server containers, the processor resource controls are
       *     mutually exclusive. The order of precedence is `CPUCount` first, then
       *     `CPUShares`, and `CPUPercent` last.
       *
       */
      CpuCount?: number;
      /**
       * Format: int64
       * @description The usable percentage of the available CPUs (Windows only).
       *
       *     On Windows Server containers, the processor resource controls are
       *     mutually exclusive. The order of precedence is `CPUCount` first, then
       *     `CPUShares`, and `CPUPercent` last.
       *
       */
      CpuPercent?: number;
      /**
       * Format: int64
       * @description Maximum IOps for the container system drive (Windows only)
       */
      IOMaximumIOps?: number;
      /**
       * Format: int64
       * @description Maximum IO in bytes per second for the container system drive
       *     (Windows only).
       *
       */
      IOMaximumBandwidth?: number;
    };
    /** @description An object describing a limit on resources which can be requested by a task.
     *      */
    Limit: {
      /**
       * Format: int64
       * @example 4000000000
       */
      NanoCPUs?: number;
      /**
       * Format: int64
       * @example 8272408576
       */
      MemoryBytes?: number;
      /**
       * Format: int64
       * @description Limits the maximum number of PIDs in the container. Set `0` for unlimited.
       *
       * @default 0
       * @example 100
       */
      Pids: number;
    };
    /** @description An object describing the resources which can be advertised by a node and
     *     requested by a task.
     *      */
    ResourceObject: {
      /**
       * Format: int64
       * @example 4000000000
       */
      NanoCPUs?: number;
      /**
       * Format: int64
       * @example 8272408576
       */
      MemoryBytes?: number;
      GenericResources?: components["schemas"]["GenericResources"];
    };
    /**
     * @description User-defined resources can be either Integer resources (e.g, `SSD=3`) or
     *     String resources (e.g, `GPU=UUID1`).
     *
     * @example [
     *       {
     *         "DiscreteResourceSpec": {
     *           "Kind": "SSD",
     *           "Value": 3
     *         }
     *       },
     *       {
     *         "NamedResourceSpec": {
     *           "Kind": "GPU",
     *           "Value": "UUID1"
     *         }
     *       },
     *       {
     *         "NamedResourceSpec": {
     *           "Kind": "GPU",
     *           "Value": "UUID2"
     *         }
     *       }
     *     ]
     */
    GenericResources: {
      NamedResourceSpec?: {
        Kind?: string;
        Value?: string;
      };
      DiscreteResourceSpec?: {
        Kind?: string;
        /** Format: int64 */
        Value?: number;
      };
    }[];
    /** @description A test to perform to check that the container is healthy. */
    HealthConfig: {
      /** @description The test to perform. Possible values are:
       *
       *     - `[]` inherit healthcheck from image or parent image
       *     - `["NONE"]` disable healthcheck
       *     - `["CMD", args...]` exec arguments directly
       *     - `["CMD-SHELL", command]` run command with system's default shell
       *      */
      Test?: string[];
      /**
       * Format: int64
       * @description The time to wait between checks in nanoseconds. It should be 0 or at
       *     least 1000000 (1 ms). 0 means inherit.
       *
       */
      Interval?: number;
      /**
       * Format: int64
       * @description The time to wait before considering the check to have hung. It should
       *     be 0 or at least 1000000 (1 ms). 0 means inherit.
       *
       */
      Timeout?: number;
      /** @description The number of consecutive failures needed to consider a container as
       *     unhealthy. 0 means inherit.
       *      */
      Retries?: number;
      /**
       * Format: int64
       * @description Start period for the container to initialize before starting
       *     health-retries countdown in nanoseconds. It should be 0 or at least
       *     1000000 (1 ms). 0 means inherit.
       *
       */
      StartPeriod?: number;
      /**
       * Format: int64
       * @description The time to wait between checks in nanoseconds during the start period.
       *     It should be 0 or at least 1000000 (1 ms). 0 means inherit.
       *
       */
      StartInterval?: number;
    };
    /** @description Health stores information about the container's healthcheck results.
     *      */
    Health: {
      /**
       * @description Status is one of `none`, `starting`, `healthy` or `unhealthy`
       *
       *     - "none"      Indicates there is no healthcheck
       *     - "starting"  Starting indicates that the container is not yet ready
       *     - "healthy"   Healthy indicates that the container is running correctly
       *     - "unhealthy" Unhealthy indicates that the container has a problem
       *
       * @example healthy
       * @enum {string}
       */
      Status?: "none" | "starting" | "healthy" | "unhealthy";
      /**
       * @description FailingStreak is the number of consecutive failures
       * @example 0
       */
      FailingStreak?: number;
      /** @description Log contains the last few results (oldest first)
       *      */
      Log?: components["schemas"]["HealthcheckResult"][];
    } | null;
    /** @description HealthcheckResult stores information about a single run of a healthcheck probe
     *      */
    HealthcheckResult: {
      /**
       * Format: date-time
       * @description Date and time at which this check started in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2020-01-04T10:44:24.496525531Z
       */
      Start?: string;
      /**
       * Format: dateTime
       * @description Date and time at which this check ended in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2020-01-04T10:45:21.364524523Z
       */
      End?: string;
      /**
       * @description ExitCode meanings:
       *
       *     - `0` healthy
       *     - `1` unhealthy
       *     - `2` reserved (considered unhealthy)
       *     - other values: error running probe
       *
       * @example 0
       */
      ExitCode?: number;
      /** @description Output from last check */
      Output?: string;
    } | null;
    /** @description Container configuration that depends on the host we are running on */
    HostConfig: components["schemas"]["Resources"] & {
      /** @description A list of volume bindings for this container. Each volume binding
       *     is a string in one of these forms:
       *
       *     - `host-src:container-dest[:options]` to bind-mount a host path
       *       into the container. Both `host-src`, and `container-dest` must
       *       be an _absolute_ path.
       *     - `volume-name:container-dest[:options]` to bind-mount a volume
       *       managed by a volume driver into the container. `container-dest`
       *       must be an _absolute_ path.
       *
       *     `options` is an optional, comma-delimited list of:
       *
       *     - `nocopy` disables automatic copying of data from the container
       *       path to the volume. The `nocopy` flag only applies to named volumes.
       *     - `[ro|rw]` mounts a volume read-only or read-write, respectively.
       *       If omitted or set to `rw`, volumes are mounted read-write.
       *     - `[z|Z]` applies SELinux labels to allow or deny multiple containers
       *       to read and write to the same volume.
       *         - `z`: a _shared_ content label is applied to the content. This
       *           label indicates that multiple containers can share the volume
       *           content, for both reading and writing.
       *         - `Z`: a _private unshared_ label is applied to the content.
       *           This label indicates that only the current container can use
       *           a private volume. Labeling systems such as SELinux require
       *           proper labels to be placed on volume content that is mounted
       *           into a container. Without a label, the security system can
       *           prevent a container's processes from using the content. By
       *           default, the labels set by the host operating system are not
       *           modified.
       *     - `[[r]shared|[r]slave|[r]private]` specifies mount
       *       [propagation behavior](https://www.kernel.org/doc/Documentation/filesystems/sharedsubtree.txt).
       *       This only applies to bind-mounted volumes, not internal volumes
       *       or named volumes. Mount propagation requires the source mount
       *       point (the location where the source directory is mounted in the
       *       host operating system) to have the correct propagation properties.
       *       For shared volumes, the source mount point must be set to `shared`.
       *       For slave volumes, the mount must be set to either `shared` or
       *       `slave`.
       *      */
      Binds?: string[];
      /**
       * @description Path to a file where the container ID is written
       * @example
       */
      ContainerIDFile?: string;
      /** @description The logging configuration for this container */
      LogConfig?: {
        /**
         * @description Name of the logging driver used for the container or "none"
         *     if logging is disabled.
         * @enum {string}
         */
        Type?:
          | "local"
          | "json-file"
          | "syslog"
          | "journald"
          | "gelf"
          | "fluentd"
          | "awslogs"
          | "splunk"
          | "etwlogs"
          | "none";
        /**
         * @description Driver-specific configuration options for the logging driver.
         * @example {
         *       "max-file": "5",
         *       "max-size": "10m"
         *     }
         */
        Config?: {
          [key: string]: string;
        };
      };
      /** @description Network mode to use for this container. Supported standard values
       *     are: `bridge`, `host`, `none`, and `container:<name|id>`. Any
       *     other value is taken as a custom network's name to which this
       *     container should connect to.
       *      */
      NetworkMode?: string;
      PortBindings?: components["schemas"]["PortMap"];
      RestartPolicy?: components["schemas"]["RestartPolicy"];
      /** @description Automatically remove the container when the container's process
       *     exits. This has no effect if `RestartPolicy` is set.
       *      */
      AutoRemove?: boolean;
      /** @description Driver that this container uses to mount volumes. */
      VolumeDriver?: string;
      /** @description A list of volumes to inherit from another container, specified in
       *     the form `<container name>[:<ro|rw>]`.
       *      */
      VolumesFrom?: string[];
      /** @description Specification for mounts to be added to the container.
       *      */
      Mounts?: components["schemas"]["Mount"][];
      /**
       * @description Initial console size, as an `[height, width]` array.
       *
       * @example [
       *       80,
       *       64
       *     ]
       */
      ConsoleSize?: number[] | null;
      /** @description Arbitrary non-identifying metadata attached to container and
       *     provided to the runtime when the container is started.
       *      */
      Annotations?: {
        [key: string]: string;
      };
      /** @description A list of kernel capabilities to add to the container. Conflicts
       *     with option 'Capabilities'.
       *      */
      CapAdd?: string[];
      /** @description A list of kernel capabilities to drop from the container. Conflicts
       *     with option 'Capabilities'.
       *      */
      CapDrop?: string[];
      /**
       * @description cgroup namespace mode for the container. Possible values are:
       *
       *     - `"private"`: the container runs in its own private cgroup namespace
       *     - `"host"`: use the host system's cgroup namespace
       *
       *     If not specified, the daemon default is used, which can either be `"private"`
       *     or `"host"`, depending on daemon version, kernel support and configuration.
       *
       * @enum {string}
       */
      CgroupnsMode?: "private" | "host";
      /** @description A list of DNS servers for the container to use. */
      Dns?: string[];
      /** @description A list of DNS options. */
      DnsOptions?: string[];
      /** @description A list of DNS search domains. */
      DnsSearch?: string[];
      /** @description A list of hostnames/IP mappings to add to the container's `/etc/hosts`
       *     file. Specified in the form `["hostname:IP"]`.
       *      */
      ExtraHosts?: string[];
      /** @description A list of additional groups that the container process will run as.
       *      */
      GroupAdd?: string[];
      /** @description IPC sharing mode for the container. Possible values are:
       *
       *     - `"none"`: own private IPC namespace, with /dev/shm not mounted
       *     - `"private"`: own private IPC namespace
       *     - `"shareable"`: own private IPC namespace, with a possibility to share it with other containers
       *     - `"container:<name|id>"`: join another (shareable) container's IPC namespace
       *     - `"host"`: use the host system's IPC namespace
       *
       *     If not specified, daemon default is used, which can either be `"private"`
       *     or `"shareable"`, depending on daemon version and configuration.
       *      */
      IpcMode?: string;
      /** @description Cgroup to use for the container. */
      Cgroup?: string;
      /** @description A list of links for the container in the form `container_name:alias`.
       *      */
      Links?: string[];
      /**
       * @description An integer value containing the score given to the container in
       *     order to tune OOM killer preferences.
       *
       * @example 500
       */
      OomScoreAdj?: number;
      /** @description Set the PID (Process) Namespace mode for the container. It can be
       *     either:
       *
       *     - `"container:<name|id>"`: joins another container's PID namespace
       *     - `"host"`: use the host's PID namespace inside the container
       *      */
      PidMode?: string;
      /** @description Gives the container full access to the host. */
      Privileged?: boolean;
      /** @description Allocates an ephemeral host port for all of a container's
       *     exposed ports.
       *
       *     Ports are de-allocated when the container stops and allocated when
       *     the container starts. The allocated port might be changed when
       *     restarting the container.
       *
       *     The port is selected from the ephemeral port range that depends on
       *     the kernel. For example, on Linux the range is defined by
       *     `/proc/sys/net/ipv4/ip_local_port_range`.
       *      */
      PublishAllPorts?: boolean;
      /** @description Mount the container's root filesystem as read only. */
      ReadonlyRootfs?: boolean;
      /** @description A list of string values to customize labels for MLS systems, such
       *     as SELinux.
       *      */
      SecurityOpt?: string[];
      /** @description Storage driver options for this container, in the form `{"size": "120G"}`.
       *      */
      StorageOpt?: {
        [key: string]: string;
      };
      /** @description A map of container directories which should be replaced by tmpfs
       *     mounts, and their corresponding mount options. For example:
       *
       *     ```
       *     { "/run": "rw,noexec,nosuid,size=65536k" }
       *     ```
       *      */
      Tmpfs?: {
        [key: string]: string;
      };
      /** @description UTS namespace to use for the container. */
      UTSMode?: string;
      /** @description Sets the usernamespace mode for the container when usernamespace
       *     remapping option is enabled.
       *      */
      UsernsMode?: string;
      /**
       * Format: int64
       * @description Size of `/dev/shm` in bytes. If omitted, the system uses 64MB.
       *
       */
      ShmSize?: number;
      /**
       * @description A list of kernel parameters (sysctls) to set in the container.
       *
       *     This field is omitted if not set.
       * @example {
       *       "net.ipv4.ip_forward": "1"
       *     }
       */
      Sysctls?: {
        [key: string]: string;
      } | null;
      /** @description Runtime to use with this container. */
      Runtime?: string | null;
      /**
       * @description Isolation technology of the container. (Windows only)
       *
       * @enum {string}
       */
      Isolation?: "default" | "process" | "hyperv" | "";
      /**
       * @description The list of paths to be masked inside the container (this overrides
       *     the default set of paths).
       *
       * @example [
       *       "/proc/asound",
       *       "/proc/acpi",
       *       "/proc/kcore",
       *       "/proc/keys",
       *       "/proc/latency_stats",
       *       "/proc/timer_list",
       *       "/proc/timer_stats",
       *       "/proc/sched_debug",
       *       "/proc/scsi",
       *       "/sys/firmware",
       *       "/sys/devices/virtual/powercap"
       *     ]
       */
      MaskedPaths?: string[];
      /**
       * @description The list of paths to be set as read-only inside the container
       *     (this overrides the default set of paths).
       *
       * @example [
       *       "/proc/bus",
       *       "/proc/fs",
       *       "/proc/irq",
       *       "/proc/sys",
       *       "/proc/sysrq-trigger"
       *     ]
       */
      ReadonlyPaths?: string[];
    };
    /** @description Configuration for a container that is portable between hosts.
     *      */
    ContainerConfig: {
      /**
       * @description The hostname to use for the container, as a valid RFC 1123 hostname.
       *
       * @example 439f4e91bd1d
       */
      Hostname?: string;
      /** @description The domain name to use for the container.
       *      */
      Domainname?: string;
      /**
       * @description Commands run as this user inside the container. If omitted, commands
       *     run as the user specified in the image the container was started from.
       *
       *     Can be either user-name or UID, and optional group-name or GID,
       *     separated by a colon (`<user-name|UID>[<:group-name|GID>]`).
       * @example 123:456
       */
      User?: string;
      /**
       * @description Whether to attach to `stdin`.
       * @default false
       */
      AttachStdin: boolean;
      /**
       * @description Whether to attach to `stdout`.
       * @default true
       */
      AttachStdout: boolean;
      /**
       * @description Whether to attach to `stderr`.
       * @default true
       */
      AttachStderr: boolean;
      /**
       * @description An object mapping ports to an empty object in the form:
       *
       *     `{"<port>/<tcp|udp|sctp>": {}}`
       *
       * @example {
       *       "80/tcp": {},
       *       "443/tcp": {}
       *     }
       */
      ExposedPorts?: {
        [key: string]: Record<string, never>;
      } | null;
      /**
       * @description Attach standard streams to a TTY, including `stdin` if it is not closed.
       *
       * @default false
       */
      Tty: boolean;
      /**
       * @description Open `stdin`
       * @default false
       */
      OpenStdin: boolean;
      /**
       * @description Close `stdin` after one attached client disconnects
       * @default false
       */
      StdinOnce: boolean;
      /**
       * @description A list of environment variables to set inside the container in the
       *     form `["VAR=value", ...]`. A variable without `=` is removed from the
       *     environment, rather than to have an empty value.
       *
       * @example [
       *       "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
       *     ]
       */
      Env?: string[];
      /**
       * @description Command to run specified as a string or an array of strings.
       *
       * @example [
       *       "/bin/sh"
       *     ]
       */
      Cmd?: string[];
      Healthcheck?: components["schemas"]["HealthConfig"];
      /**
       * @description Command is already escaped (Windows only)
       * @default false
       * @example false
       */
      ArgsEscaped: boolean | null;
      /**
       * @description The name (or reference) of the image to use when creating the container,
       *     or which was used when the container was created.
       *
       * @example example-image:1.0
       */
      Image?: string;
      /** @description An object mapping mount point paths inside the container to empty
       *     objects.
       *      */
      Volumes?: {
        [key: string]: Record<string, never>;
      };
      /**
       * @description The working directory for commands to run in.
       * @example /public/
       */
      WorkingDir?: string;
      /**
       * @description The entry point for the container as a string or an array of strings.
       *
       *     If the array consists of exactly one empty string (`[""]`) then the
       *     entry point is reset to system default (i.e., the entry point used by
       *     docker when there is no `ENTRYPOINT` instruction in the `Dockerfile`).
       *
       * @example []
       */
      Entrypoint?: string[];
      /** @description Disable networking for the container. */
      NetworkDisabled?: boolean | null;
      /** @description MAC address of the container.
       *
       *     Deprecated: this field is deprecated in API v1.44 and up. Use EndpointSettings.MacAddress instead.
       *      */
      MacAddress?: string | null;
      /**
       * @description `ONBUILD` metadata that were defined in the image's `Dockerfile`.
       *
       * @example []
       */
      OnBuild?: string[] | null;
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.some-label": "some-value",
       *       "com.example.some-other-label": "some-other-value"
       *     }
       */
      Labels?: {
        [key: string]: string;
      };
      /**
       * @description Signal to stop a container as a string or unsigned integer.
       *
       * @example SIGTERM
       */
      StopSignal?: string | null;
      /** @description Timeout to stop a container in seconds. */
      StopTimeout?: number | null;
      /**
       * @description Shell for when `RUN`, `CMD`, and `ENTRYPOINT` uses a shell.
       *
       * @example [
       *       "/bin/sh",
       *       "-c"
       *     ]
       */
      Shell?: string[] | null;
    };
    /**
     * @description Configuration of the image. These fields are used as defaults
     *     when starting a container from the image.
     *
     * @example {
     *       "User": "web:web",
     *       "ExposedPorts": {
     *         "80/tcp": {},
     *         "443/tcp": {}
     *       },
     *       "Env": [
     *         "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
     *       ],
     *       "Cmd": [
     *         "/bin/sh"
     *       ],
     *       "Healthcheck": {
     *         "Test": [
     *           "string"
     *         ],
     *         "Interval": 0,
     *         "Timeout": 0,
     *         "Retries": 0,
     *         "StartPeriod": 0,
     *         "StartInterval": 0
     *       },
     *       "ArgsEscaped": true,
     *       "Volumes": {
     *         "/app/data": {},
     *         "/app/config": {}
     *       },
     *       "WorkingDir": "/public/",
     *       "Entrypoint": [],
     *       "OnBuild": [],
     *       "Labels": {
     *         "com.example.some-label": "some-value",
     *         "com.example.some-other-label": "some-other-value"
     *       },
     *       "StopSignal": "SIGTERM",
     *       "Shell": [
     *         "/bin/sh",
     *         "-c"
     *       ]
     *     }
     */
    ImageConfig: {
      /**
       * @description The user that commands are run as inside the container.
       * @example web:web
       */
      User?: string;
      /**
       * @description An object mapping ports to an empty object in the form:
       *
       *     `{"<port>/<tcp|udp|sctp>": {}}`
       *
       * @example {
       *       "80/tcp": {},
       *       "443/tcp": {}
       *     }
       */
      ExposedPorts?: {
        [key: string]: Record<string, never>;
      } | null;
      /**
       * @description A list of environment variables to set inside the container in the
       *     form `["VAR=value", ...]`. A variable without `=` is removed from the
       *     environment, rather than to have an empty value.
       *
       * @example [
       *       "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
       *     ]
       */
      Env?: string[];
      /**
       * @description Command to run specified as a string or an array of strings.
       *
       * @example [
       *       "/bin/sh"
       *     ]
       */
      Cmd?: string[];
      Healthcheck?: components["schemas"]["HealthConfig"];
      /**
       * @description Command is already escaped (Windows only)
       * @default false
       * @example false
       */
      ArgsEscaped: boolean | null;
      /**
       * @description An object mapping mount point paths inside the container to empty
       *     objects.
       *
       * @example {
       *       "/app/data": {},
       *       "/app/config": {}
       *     }
       */
      Volumes?: {
        [key: string]: Record<string, never>;
      };
      /**
       * @description The working directory for commands to run in.
       * @example /public/
       */
      WorkingDir?: string;
      /**
       * @description The entry point for the container as a string or an array of strings.
       *
       *     If the array consists of exactly one empty string (`[""]`) then the
       *     entry point is reset to system default (i.e., the entry point used by
       *     docker when there is no `ENTRYPOINT` instruction in the `Dockerfile`).
       *
       * @example []
       */
      Entrypoint?: string[];
      /**
       * @description `ONBUILD` metadata that were defined in the image's `Dockerfile`.
       *
       * @example []
       */
      OnBuild?: string[] | null;
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.some-label": "some-value",
       *       "com.example.some-other-label": "some-other-value"
       *     }
       */
      Labels?: {
        [key: string]: string;
      };
      /**
       * @description Signal to stop a container as a string or unsigned integer.
       *
       * @example SIGTERM
       */
      StopSignal?: string | null;
      /**
       * @description Shell for when `RUN`, `CMD`, and `ENTRYPOINT` uses a shell.
       *
       * @example [
       *       "/bin/sh",
       *       "-c"
       *     ]
       */
      Shell?: string[] | null;
    };
    /**
     * @description NetworkingConfig represents the container's networking configuration for
     *     each of its interfaces.
     *     It is used for the networking configs specified in the `docker create`
     *     and `docker network connect` commands.
     *
     * @example {
     *       "EndpointsConfig": {
     *         "isolated_nw": {
     *           "IPAMConfig": {
     *             "IPv4Address": "172.20.30.33",
     *             "IPv6Address": "2001:db8:abcd::3033",
     *             "LinkLocalIPs": [
     *               "169.254.34.68",
     *               "fe80::3468"
     *             ]
     *           },
     *           "MacAddress": "02:42:ac:12:05:02",
     *           "Links": [
     *             "container_1",
     *             "container_2"
     *           ],
     *           "Aliases": [
     *             "server_x",
     *             "server_y"
     *           ]
     *         },
     *         "database_nw": {}
     *       }
     *     }
     */
    NetworkingConfig: {
      /** @description A mapping of network name to endpoint configuration for that network.
       *     The endpoint configuration can be left empty to connect to that
       *     network with no particular endpoint configuration.
       *      */
      EndpointsConfig?: {
        [key: string]: components["schemas"]["EndpointSettings"];
      };
    };
    /** @description NetworkSettings exposes the network settings in the API */
    NetworkSettings: {
      /**
       * @description Name of the default bridge interface when dockerd's --bridge flag is set.
       *
       * @example docker0
       */
      Bridge?: string;
      /**
       * @description SandboxID uniquely represents a container's network stack.
       * @example 9d12daf2c33f5959c8bf90aa513e4f65b561738661003029ec84830cd503a0c3
       */
      SandboxID?: string;
      /**
       * @description Indicates if hairpin NAT should be enabled on the virtual interface.
       *
       *     Deprecated: This field is never set and will be removed in a future release.
       *
       * @example false
       */
      HairpinMode?: boolean;
      /**
       * @description IPv6 unicast address using the link-local prefix.
       *
       *     Deprecated: This field is never set and will be removed in a future release.
       *
       * @example
       */
      LinkLocalIPv6Address?: string;
      /** @description Prefix length of the IPv6 unicast address.
       *
       *     Deprecated: This field is never set and will be removed in a future release.
       *      */
      LinkLocalIPv6PrefixLen?: number;
      Ports?: components["schemas"]["PortMap"];
      /**
       * @description SandboxKey is the full path of the netns handle
       * @example /var/run/docker/netns/8ab54b426c38
       */
      SandboxKey?: string;
      /** @description Deprecated: This field is never set and will be removed in a future release. */
      SecondaryIPAddresses?: components["schemas"]["Address"][] | null;
      /** @description Deprecated: This field is never set and will be removed in a future release. */
      SecondaryIPv6Addresses?: components["schemas"]["Address"][] | null;
      /**
       * @description EndpointID uniquely represents a service endpoint in a Sandbox.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: This field is only propagated when attached to the
       *     > default "bridge" network. Use the information from the "bridge"
       *     > network inside the `Networks` map instead, which contains the same
       *     > information. This field was deprecated in Docker 1.9 and is scheduled
       *     > to be removed in Docker 17.12.0
       *
       * @example b88f5b905aabf2893f3cbc4ee42d1ea7980bbc0a92e2c8922b1e1795298afb0b
       */
      EndpointID?: string;
      /**
       * @description Gateway address for the default "bridge" network.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: This field is only propagated when attached to the
       *     > default "bridge" network. Use the information from the "bridge"
       *     > network inside the `Networks` map instead, which contains the same
       *     > information. This field was deprecated in Docker 1.9 and is scheduled
       *     > to be removed in Docker 17.12.0
       *
       * @example 172.17.0.1
       */
      Gateway?: string;
      /**
       * @description Global IPv6 address for the default "bridge" network.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: This field is only propagated when attached to the
       *     > default "bridge" network. Use the information from the "bridge"
       *     > network inside the `Networks` map instead, which contains the same
       *     > information. This field was deprecated in Docker 1.9 and is scheduled
       *     > to be removed in Docker 17.12.0
       *
       * @example 2001:db8::5689
       */
      GlobalIPv6Address?: string;
      /**
       * @description Mask length of the global IPv6 address.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: This field is only propagated when attached to the
       *     > default "bridge" network. Use the information from the "bridge"
       *     > network inside the `Networks` map instead, which contains the same
       *     > information. This field was deprecated in Docker 1.9 and is scheduled
       *     > to be removed in Docker 17.12.0
       *
       * @example 64
       */
      GlobalIPv6PrefixLen?: number;
      /**
       * @description IPv4 address for the default "bridge" network.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: This field is only propagated when attached to the
       *     > default "bridge" network. Use the information from the "bridge"
       *     > network inside the `Networks` map instead, which contains the same
       *     > information. This field was deprecated in Docker 1.9 and is scheduled
       *     > to be removed in Docker 17.12.0
       *
       * @example 172.17.0.4
       */
      IPAddress?: string;
      /**
       * @description Mask length of the IPv4 address.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: This field is only propagated when attached to the
       *     > default "bridge" network. Use the information from the "bridge"
       *     > network inside the `Networks` map instead, which contains the same
       *     > information. This field was deprecated in Docker 1.9 and is scheduled
       *     > to be removed in Docker 17.12.0
       *
       * @example 16
       */
      IPPrefixLen?: number;
      /**
       * @description IPv6 gateway address for this network.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: This field is only propagated when attached to the
       *     > default "bridge" network. Use the information from the "bridge"
       *     > network inside the `Networks` map instead, which contains the same
       *     > information. This field was deprecated in Docker 1.9 and is scheduled
       *     > to be removed in Docker 17.12.0
       *
       * @example 2001:db8:2::100
       */
      IPv6Gateway?: string;
      /**
       * @description MAC address for the container on the default "bridge" network.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: This field is only propagated when attached to the
       *     > default "bridge" network. Use the information from the "bridge"
       *     > network inside the `Networks` map instead, which contains the same
       *     > information. This field was deprecated in Docker 1.9 and is scheduled
       *     > to be removed in Docker 17.12.0
       *
       * @example 02:42:ac:11:00:04
       */
      MacAddress?: string;
      /** @description Information about all networks that the container is connected to.
       *      */
      Networks?: {
        [key: string]: components["schemas"]["EndpointSettings"];
      };
    };
    /** @description Address represents an IPv4 or IPv6 IP address. */
    Address: {
      /** @description IP address. */
      Addr?: string;
      /** @description Mask length of the IP address. */
      PrefixLen?: number;
    };
    /**
     * @description PortMap describes the mapping of container ports to host ports, using the
     *     container's port-number and protocol as key in the format `<port>/<protocol>`,
     *     for example, `80/udp`.
     *
     *     If a container's port is mapped for multiple protocols, separate entries
     *     are added to the mapping table.
     *
     * @example {
     *       "443/tcp": [
     *         {
     *           "HostIp": "127.0.0.1",
     *           "HostPort": "4443"
     *         }
     *       ],
     *       "80/tcp": [
     *         {
     *           "HostIp": "0.0.0.0",
     *           "HostPort": "80"
     *         },
     *         {
     *           "HostIp": "0.0.0.0",
     *           "HostPort": "8080"
     *         }
     *       ],
     *       "80/udp": [
     *         {
     *           "HostIp": "0.0.0.0",
     *           "HostPort": "80"
     *         }
     *       ],
     *       "53/udp": [
     *         {
     *           "HostIp": "0.0.0.0",
     *           "HostPort": "53"
     *         }
     *       ]
     *     }
     */
    PortMap: {
      [key: string]: components["schemas"]["PortBinding"][] | null;
    };
    /** @description PortBinding represents a binding between a host IP address and a host
     *     port.
     *      */
    PortBinding: {
      /**
       * @description Host IP address that the container's port is mapped to.
       * @example 127.0.0.1
       */
      HostIp?: string;
      /**
       * @description Host port number that the container's port is mapped to.
       * @example 4443
       */
      HostPort?: string;
    };
    /** @description Information about the storage driver used to store the container's and
     *     image's filesystem.
     *      */
    DriverData: {
      /**
       * @description Name of the storage driver.
       * @example overlay2
       */
      Name: string;
      /**
       * @description Low-level storage metadata, provided as key/value pairs.
       *
       *     This information is driver-specific, and depends on the storage-driver
       *     in use, and should be used for informational purposes only.
       *
       * @example {
       *       "MergedDir": "/var/lib/docker/overlay2/ef749362d13333e65fc95c572eb525abbe0052e16e086cb64bc3b98ae9aa6d74/merged",
       *       "UpperDir": "/var/lib/docker/overlay2/ef749362d13333e65fc95c572eb525abbe0052e16e086cb64bc3b98ae9aa6d74/diff",
       *       "WorkDir": "/var/lib/docker/overlay2/ef749362d13333e65fc95c572eb525abbe0052e16e086cb64bc3b98ae9aa6d74/work"
       *     }
       */
      Data: {
        [key: string]: string;
      };
    };
    /** @description Change in the container's filesystem.
     *      */
    FilesystemChange: {
      /** @description Path to file or directory that has changed.
       *      */
      Path: string;
      Kind: components["schemas"]["ChangeType"];
    };
    /**
     * Format: uint8
     * @description Kind of change
     *
     *     Can be one of:
     *
     *     - `0`: Modified ("C")
     *     - `1`: Added ("A")
     *     - `2`: Deleted ("D")
     *
     * @enum {integer}
     */
    ChangeType: 0 | 1 | 2;
    /** @description Information about an image in the local image cache.
     *      */
    ImageInspect: {
      /**
       * @description ID is the content-addressable ID of an image.
       *
       *     This identifier is a content-addressable digest calculated from the
       *     image's configuration (which includes the digests of layers used by
       *     the image).
       *
       *     Note that this digest differs from the `RepoDigests` below, which
       *     holds digests of image manifests that reference the image.
       *
       * @example sha256:ec3f0931a6e6b6855d76b2d7b0be30e81860baccd891b2e243280bf1cd8ad710
       */
      Id?: string;
      Descriptor?: components["schemas"]["OCIDescriptor"];
      /** @description Manifests is a list of image manifests available in this image. It
       *     provides a more detailed view of the platform-specific image manifests or
       *     other image-attached data like build attestations.
       *
       *     Only available if the daemon provides a multi-platform image store
       *     and the `manifests` option is set in the inspect request.
       *
       *     WARNING: This is experimental and may change at any time without any backward
       *     compatibility.
       *      */
      Manifests?: components["schemas"]["ImageManifestSummary"][] | null;
      /**
       * @description List of image names/tags in the local image cache that reference this
       *     image.
       *
       *     Multiple image tags can refer to the same image, and this list may be
       *     empty if no tags reference the image, in which case the image is
       *     "untagged", in which case it can still be referenced by its ID.
       *
       * @example [
       *       "example:1.0",
       *       "example:latest",
       *       "example:stable",
       *       "internal.registry.example.com:5000/example:1.0"
       *     ]
       */
      RepoTags?: string[];
      /**
       * @description List of content-addressable digests of locally available image manifests
       *     that the image is referenced from. Multiple manifests can refer to the
       *     same image.
       *
       *     These digests are usually only available if the image was either pulled
       *     from a registry, or if the image was pushed to a registry, which is when
       *     the manifest is generated and its digest calculated.
       *
       * @example [
       *       "example@sha256:afcc7f1ac1b49db317a7196c902e61c6c3c4607d63599ee1a82d702d249a0ccb",
       *       "internal.registry.example.com:5000/example@sha256:b69959407d21e8a062e0416bf13405bb2b71ed7a84dde4158ebafacfa06f5578"
       *     ]
       */
      RepoDigests?: string[];
      /**
       * @description ID of the parent image.
       *
       *     Depending on how the image was created, this field may be empty and
       *     is only set for images that were built/created locally. This field
       *     is empty if the image was pulled from an image registry.
       *
       * @example
       */
      Parent?: string;
      /**
       * @description Optional message that was set when committing or importing the image.
       *
       * @example
       */
      Comment?: string;
      /**
       * Format: dateTime
       * @description Date and time at which the image was created, formatted in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       *     This information is only available if present in the image,
       *     and omitted otherwise.
       *
       * @example 2022-02-04T21:20:12.497794809Z
       */
      Created?: string | null;
      /**
       * @description The version of Docker that was used to build the image.
       *
       *     Depending on how the image was created, this field may be empty.
       *
       * @example 27.0.1
       */
      DockerVersion?: string;
      /**
       * @description Name of the author that was specified when committing the image, or as
       *     specified through MAINTAINER (deprecated) in the Dockerfile.
       *
       * @example
       */
      Author?: string;
      Config?: components["schemas"]["ImageConfig"];
      /**
       * @description Hardware CPU architecture that the image runs on.
       *
       * @example arm
       */
      Architecture?: string;
      /**
       * @description CPU architecture variant (presently ARM-only).
       *
       * @example v7
       */
      Variant?: string | null;
      /**
       * @description Operating System the image is built to run on.
       *
       * @example linux
       */
      Os?: string;
      /**
       * @description Operating System version the image is built to run on (especially
       *     for Windows).
       *
       * @example
       */
      OsVersion?: string | null;
      /**
       * Format: int64
       * @description Total size of the image including all layers it is composed of.
       *
       * @example 1239828
       */
      Size?: number;
      /**
       * Format: int64
       * @description Total size of the image including all layers it is composed of.
       *
       *     Deprecated: this field is omitted in API v1.44, but kept for backward compatibility. Use Size instead.
       *
       * @example 1239828
       */
      VirtualSize?: number;
      GraphDriver?: components["schemas"]["DriverData"];
      /** @description Information about the image's RootFS, including the layer IDs.
       *      */
      RootFS?: {
        /** @example layers */
        Type: string;
        /** @example [
         *       "sha256:1834950e52ce4d5a88a1bbd131c537f4d0e56d10ff0dd69e66be3b7dfa9df7e6",
         *       "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef"
         *     ] */
        Layers?: string[];
      };
      /** @description Additional metadata of the image in the local cache. This information
       *     is local to the daemon, and not part of the image itself.
       *      */
      Metadata?: {
        /**
         * Format: dateTime
         * @description Date and time at which the image was last tagged in
         *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
         *
         *     This information is only available if the image was tagged locally,
         *     and omitted otherwise.
         *
         * @example 2022-02-28T14:40:02.623929178Z
         */
        LastTagTime?: string | null;
      };
    };
    ImageSummary: {
      /**
       * @description ID is the content-addressable ID of an image.
       *
       *     This identifier is a content-addressable digest calculated from the
       *     image's configuration (which includes the digests of layers used by
       *     the image).
       *
       *     Note that this digest differs from the `RepoDigests` below, which
       *     holds digests of image manifests that reference the image.
       *
       * @example sha256:ec3f0931a6e6b6855d76b2d7b0be30e81860baccd891b2e243280bf1cd8ad710
       */
      Id: string;
      /**
       * @description ID of the parent image.
       *
       *     Depending on how the image was created, this field may be empty and
       *     is only set for images that were built/created locally. This field
       *     is empty if the image was pulled from an image registry.
       *
       * @example
       */
      ParentId: string;
      /**
       * @description List of image names/tags in the local image cache that reference this
       *     image.
       *
       *     Multiple image tags can refer to the same image, and this list may be
       *     empty if no tags reference the image, in which case the image is
       *     "untagged", in which case it can still be referenced by its ID.
       *
       * @example [
       *       "example:1.0",
       *       "example:latest",
       *       "example:stable",
       *       "internal.registry.example.com:5000/example:1.0"
       *     ]
       */
      RepoTags: string[];
      /**
       * @description List of content-addressable digests of locally available image manifests
       *     that the image is referenced from. Multiple manifests can refer to the
       *     same image.
       *
       *     These digests are usually only available if the image was either pulled
       *     from a registry, or if the image was pushed to a registry, which is when
       *     the manifest is generated and its digest calculated.
       *
       * @example [
       *       "example@sha256:afcc7f1ac1b49db317a7196c902e61c6c3c4607d63599ee1a82d702d249a0ccb",
       *       "internal.registry.example.com:5000/example@sha256:b69959407d21e8a062e0416bf13405bb2b71ed7a84dde4158ebafacfa06f5578"
       *     ]
       */
      RepoDigests: string[];
      /**
       * @description Date and time at which the image was created as a Unix timestamp
       *     (number of seconds since EPOCH).
       *
       * @example 1644009612
       */
      Created: number;
      /**
       * Format: int64
       * @description Total size of the image including all layers it is composed of.
       *
       * @example 172064416
       */
      Size: number;
      /**
       * Format: int64
       * @description Total size of image layers that are shared between this image and other
       *     images.
       *
       *     This size is not calculated by default. `-1` indicates that the value
       *     has not been set / calculated.
       *
       * @example 1239828
       */
      SharedSize: number;
      /**
       * Format: int64
       * @description Total size of the image including all layers it is composed of.
       *
       *     Deprecated: this field is omitted in API v1.44, but kept for backward compatibility. Use Size instead.
       * @example 172064416
       */
      VirtualSize?: number;
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.some-label": "some-value",
       *       "com.example.some-other-label": "some-other-value"
       *     }
       */
      Labels: {
        [key: string]: string;
      };
      /**
       * @description Number of containers using this image. Includes both stopped and running
       *     containers.
       *
       *     This size is not calculated by default, and depends on which API endpoint
       *     is used. `-1` indicates that the value has not been set / calculated.
       *
       * @example 2
       */
      Containers: number;
      /** @description Manifests is a list of manifests available in this image.
       *     It provides a more detailed view of the platform-specific image manifests
       *     or other image-attached data like build attestations.
       *
       *     WARNING: This is experimental and may change at any time without any backward
       *     compatibility.
       *      */
      Manifests?: components["schemas"]["ImageManifestSummary"][];
      Descriptor?: components["schemas"]["OCIDescriptor"];
    };
    /** @example {
     *       "username": "hannibal",
     *       "password": "xxxx",
     *       "serveraddress": "https://index.docker.io/v1/"
     *     } */
    AuthConfig: {
      username?: string;
      password?: string;
      email?: string;
      serveraddress?: string;
    };
    ProcessConfig: {
      privileged?: boolean;
      user?: string;
      tty?: boolean;
      entrypoint?: string;
      arguments?: string[];
    };
    Volume: {
      /**
       * @description Name of the volume.
       * @example tardis
       */
      Name: string;
      /**
       * @description Name of the volume driver used by the volume.
       * @example custom
       */
      Driver: string;
      /**
       * @description Mount path of the volume on the host.
       * @example /var/lib/docker/volumes/tardis
       */
      Mountpoint: string;
      /**
       * Format: dateTime
       * @description Date/Time the volume was created.
       * @example 2016-06-07T20:31:11.853781916Z
       */
      CreatedAt?: string;
      /**
       * @description Low-level details about the volume, provided by the volume driver.
       *     Details are returned as a map with key/value pairs:
       *     `{"key":"value","key2":"value2"}`.
       *
       *     The `Status` field is optional, and is omitted if the volume driver
       *     does not support this feature.
       *
       * @example {
       *       "hello": "world"
       *     }
       */
      Status?: {
        [key: string]: Record<string, never>;
      };
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.some-label": "some-value",
       *       "com.example.some-other-label": "some-other-value"
       *     }
       */
      Labels: {
        [key: string]: string;
      };
      /**
       * @description The level at which the volume exists. Either `global` for cluster-wide,
       *     or `local` for machine level.
       *
       * @default local
       * @example local
       * @enum {string}
       */
      Scope: "local" | "global";
      ClusterVolume?: components["schemas"]["ClusterVolume"];
      /**
       * @description The driver specific options used when creating the volume.
       *
       * @example {
       *       "device": "tmpfs",
       *       "o": "size=100m,uid=1000",
       *       "type": "tmpfs"
       *     }
       */
      Options: {
        [key: string]: string;
      };
      /** @description Usage details about the volume. This information is used by the
       *     `GET /system/df` endpoint, and omitted in other endpoints.
       *      */
      UsageData?: {
        /**
         * Format: int64
         * @description Amount of disk space used by the volume (in bytes). This information
         *     is only available for volumes created with the `"local"` volume
         *     driver. For volumes created with other volume drivers, this field
         *     is set to `-1` ("not available")
         *
         * @default -1
         */
        Size: number;
        /**
         * Format: int64
         * @description The number of containers referencing this volume. This field
         *     is set to `-1` if the reference-count is not available.
         *
         * @default -1
         */
        RefCount: number;
      } | null;
    };
    /**
     * VolumeConfig
     * @description Volume configuration
     */
    VolumeCreateOptions: {
      /**
       * @description The new volume's name. If not specified, Docker generates a name.
       *
       * @example tardis
       */
      Name?: string;
      /**
       * @description Name of the volume driver to use.
       * @default local
       * @example custom
       */
      Driver: string;
      /**
       * @description A mapping of driver options and values. These options are
       *     passed directly to the driver and are driver specific.
       *
       * @example {
       *       "device": "tmpfs",
       *       "o": "size=100m,uid=1000",
       *       "type": "tmpfs"
       *     }
       */
      DriverOpts?: {
        [key: string]: string;
      };
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.some-label": "some-value",
       *       "com.example.some-other-label": "some-other-value"
       *     }
       */
      Labels?: {
        [key: string]: string;
      };
      ClusterVolumeSpec?: components["schemas"]["ClusterVolumeSpec"];
    };
    /**
     * VolumeListResponse
     * @description Volume list response
     */
    VolumeListResponse: {
      /** @description List of volumes */
      Volumes?: components["schemas"]["Volume"][];
      /**
       * @description Warnings that occurred when fetching the list of volumes.
       *
       * @example []
       */
      Warnings?: string[];
    };
    Network: {
      /**
       * @description Name of the network.
       *
       * @example my_network
       */
      Name?: string;
      /**
       * @description ID that uniquely identifies a network on a single machine.
       *
       * @example 7d86d31b1478e7cca9ebed7e73aa0fdeec46c5ca29497431d3007d2d9e15ed99
       */
      Id?: string;
      /**
       * Format: dateTime
       * @description Date and time at which the network was created in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2016-10-19T04:33:30.360899459Z
       */
      Created?: string;
      /**
       * @description The level at which the network exists (e.g. `swarm` for cluster-wide
       *     or `local` for machine level)
       *
       * @example local
       */
      Scope?: string;
      /**
       * @description The name of the driver used to create the network (e.g. `bridge`,
       *     `overlay`).
       *
       * @example overlay
       */
      Driver?: string;
      /**
       * @description Whether the network was created with IPv4 enabled.
       *
       * @example true
       */
      EnableIPv4?: boolean;
      /**
       * @description Whether the network was created with IPv6 enabled.
       *
       * @example false
       */
      EnableIPv6?: boolean;
      IPAM?: components["schemas"]["IPAM"];
      /**
       * @description Whether the network is created to only allow internal networking
       *     connectivity.
       *
       * @default false
       * @example false
       */
      Internal: boolean;
      /**
       * @description Whether a global / swarm scope network is manually attachable by regular
       *     containers from workers in swarm mode.
       *
       * @default false
       * @example false
       */
      Attachable: boolean;
      /**
       * @description Whether the network is providing the routing-mesh for the swarm cluster.
       *
       * @default false
       * @example false
       */
      Ingress: boolean;
      ConfigFrom?: components["schemas"]["ConfigReference"];
      /**
       * @description Whether the network is a config-only network. Config-only networks are
       *     placeholder networks for network configurations to be used by other
       *     networks. Config-only networks cannot be used directly to run containers
       *     or services.
       *
       * @default false
       */
      ConfigOnly: boolean;
      /**
       * @description Contains endpoints attached to the network.
       *
       * @example {
       *       "19a4d5d687db25203351ed79d478946f861258f018fe384f229f2efa4b23513c": {
       *         "Name": "test",
       *         "EndpointID": "628cadb8bcb92de107b2a1e516cbffe463e321f548feb37697cce00ad694f21a",
       *         "MacAddress": "02:42:ac:13:00:02",
       *         "IPv4Address": "172.19.0.2/16",
       *         "IPv6Address": ""
       *       }
       *     }
       */
      Containers?: {
        [key: string]: components["schemas"]["NetworkContainer"];
      };
      /**
       * @description Network-specific options uses when creating the network.
       *
       * @example {
       *       "com.docker.network.bridge.default_bridge": "true",
       *       "com.docker.network.bridge.enable_icc": "true",
       *       "com.docker.network.bridge.enable_ip_masquerade": "true",
       *       "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
       *       "com.docker.network.bridge.name": "docker0",
       *       "com.docker.network.driver.mtu": "1500"
       *     }
       */
      Options?: {
        [key: string]: string;
      };
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.some-label": "some-value",
       *       "com.example.some-other-label": "some-other-value"
       *     }
       */
      Labels?: {
        [key: string]: string;
      };
      /** @description List of peer nodes for an overlay network. This field is only present
       *     for overlay networks, and omitted for other network types.
       *      */
      Peers?: components["schemas"]["PeerInfo"][] | null;
    };
    /** @description The config-only network source to provide the configuration for
     *     this network.
     *      */
    ConfigReference: {
      /**
       * @description The name of the config-only network that provides the network's
       *     configuration. The specified network must be an existing config-only
       *     network. Only network names are allowed, not network IDs.
       *
       * @example config_only_network_01
       */
      Network?: string;
    };
    IPAM: {
      /**
       * @description Name of the IPAM driver to use.
       * @default default
       * @example default
       */
      Driver: string;
      /** @description List of IPAM configuration options, specified as a map:
       *
       *     ```
       *     {"Subnet": <CIDR>, "IPRange": <CIDR>, "Gateway": <IP address>, "AuxAddress": <device_name:IP address>}
       *     ```
       *      */
      Config?: components["schemas"]["IPAMConfig"][];
      /**
       * @description Driver-specific options, specified as a map.
       * @example {
       *       "foo": "bar"
       *     }
       */
      Options?: {
        [key: string]: string;
      };
    };
    IPAMConfig: {
      /** @example 172.20.0.0/16 */
      Subnet?: string;
      /** @example 172.20.10.0/24 */
      IPRange?: string;
      /** @example 172.20.10.11 */
      Gateway?: string;
      AuxiliaryAddresses?: {
        [key: string]: string;
      };
    };
    NetworkContainer: {
      /** @example container_1 */
      Name?: string;
      /** @example 628cadb8bcb92de107b2a1e516cbffe463e321f548feb37697cce00ad694f21a */
      EndpointID?: string;
      /** @example 02:42:ac:13:00:02 */
      MacAddress?: string;
      /** @example 172.19.0.2/16 */
      IPv4Address?: string;
      /** @example  */
      IPv6Address?: string;
    };
    /** @description PeerInfo represents one peer of an overlay network.
     *      */
    PeerInfo: {
      /**
       * @description ID of the peer-node in the Swarm cluster.
       * @example 6869d7c1732b
       */
      Name?: string;
      /**
       * @description IP-address of the peer-node in the Swarm cluster.
       * @example 10.133.77.91
       */
      IP?: string;
    };
    /**
     * NetworkCreateResponse
     * @description OK response to NetworkCreate operation
     */
    NetworkCreateResponse: {
      /**
       * @description The ID of the created network.
       * @example b5c4fc71e8022147cd25de22b22173de4e3b170134117172eb595cb91b4e7e5d
       */
      Id: string;
      /**
       * @description Warnings encountered when creating the container
       * @example
       */
      Warning: string;
    };
    BuildInfo: {
      id?: string;
      stream?: string;
      /** @description errors encountered during the operation.
       *
       *
       *     > **Deprecated**: This field is deprecated since API v1.4, and will be omitted in a future API version. Use the information in errorDetail instead. */
      error?: string | null;
      errorDetail?: components["schemas"]["ErrorDetail"];
      status?: string;
      /** @description Progress is a pre-formatted presentation of progressDetail.
       *
       *
       *     > **Deprecated**: This field is deprecated since API v1.8, and will be omitted in a future API version. Use the information in progressDetail instead. */
      progress?: string | null;
      progressDetail?: components["schemas"]["ProgressDetail"];
      aux?: components["schemas"]["ImageID"];
    };
    /** @description BuildCache contains information about a build cache record.
     *      */
    BuildCache: {
      /**
       * @description Unique ID of the build cache record.
       *
       * @example ndlpt0hhvkqcdfkputsk4cq9c
       */
      ID?: string;
      /**
       * @description ID of the parent build cache record.
       *
       *     > **Deprecated**: This field is deprecated, and omitted if empty.
       *
       * @example
       */
      Parent?: string | null;
      /**
       * @description List of parent build cache record IDs.
       *
       * @example [
       *       "hw53o5aio51xtltp5xjp8v7fx"
       *     ]
       */
      Parents?: string[] | null;
      /**
       * @description Cache record type.
       *
       * @example regular
       * @enum {string}
       */
      Type?:
        | "internal"
        | "frontend"
        | "source.local"
        | "source.git.checkout"
        | "exec.cachemount"
        | "regular";
      /**
       * @description Description of the build-step that produced the build cache.
       *
       * @example mount / from exec /bin/sh -c echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache
       */
      Description?: string;
      /**
       * @description Indicates if the build cache is in use.
       *
       * @example false
       */
      InUse?: boolean;
      /**
       * @description Indicates if the build cache is shared.
       *
       * @example true
       */
      Shared?: boolean;
      /**
       * @description Amount of disk space used by the build cache (in bytes).
       *
       * @example 51
       */
      Size?: number;
      /**
       * Format: dateTime
       * @description Date and time at which the build cache was created in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2016-08-18T10:44:24.496525531Z
       */
      CreatedAt?: string;
      /**
       * Format: dateTime
       * @description Date and time at which the build cache was last used in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2017-08-09T07:09:37.632105588Z
       */
      LastUsedAt?: string | null;
      /** @example 26 */
      UsageCount?: number;
    };
    /**
     * @description Image ID or Digest
     * @example {
     *       "ID": "sha256:85f05633ddc1c50679be2b16a0479ab6f7637f8884e0cfe0f4d20e1ebb3d6e7c"
     *     }
     */
    ImageID: {
      ID?: string;
    };
    CreateImageInfo: {
      id?: string;
      /** @description errors encountered during the operation.
       *
       *
       *     > **Deprecated**: This field is deprecated since API v1.4, and will be omitted in a future API version. Use the information in errorDetail instead. */
      error?: string | null;
      errorDetail?: components["schemas"]["ErrorDetail"];
      status?: string;
      /** @description Progress is a pre-formatted presentation of progressDetail.
       *
       *
       *     > **Deprecated**: This field is deprecated since API v1.8, and will be omitted in a future API version. Use the information in progressDetail instead. */
      progress?: string | null;
      progressDetail?: components["schemas"]["ProgressDetail"];
    };
    PushImageInfo: {
      /** @description errors encountered during the operation.
       *
       *
       *     > **Deprecated**: This field is deprecated since API v1.4, and will be omitted in a future API version. Use the information in errorDetail instead. */
      error?: string | null;
      errorDetail?: components["schemas"]["ErrorDetail"];
      status?: string;
      /** @description Progress is a pre-formatted presentation of progressDetail.
       *
       *
       *     > **Deprecated**: This field is deprecated since API v1.8, and will be omitted in a future API version. Use the information in progressDetail instead. */
      progress?: string | null;
      progressDetail?: components["schemas"]["ProgressDetail"];
    };
    /** @description DeviceInfo represents a device that can be used by a container.
     *      */
    DeviceInfo: {
      /**
       * @description The origin device driver.
       *
       * @example cdi
       */
      Source?: string;
      /**
       * @description The unique identifier for the device within its source driver.
       *     For CDI devices, this would be an FQDN like "vendor.com/gpu=0".
       *
       * @example vendor.com/gpu=0
       */
      ID?: string;
    };
    ErrorDetail: {
      code?: number;
      message?: string;
    };
    ProgressDetail: {
      current?: number;
      total?: number;
    };
    /**
     * @description Represents an error.
     * @example {
     *       "message": "Something went wrong."
     *     }
     */
    ErrorResponse: {
      /** @description The error message. */
      message: string;
    };
    /** @description Response to an API call that returns just an Id */
    IDResponse: {
      /** @description The id of the newly created object. */
      Id: string;
    };
    /** @description Configuration for a network endpoint. */
    EndpointSettings: {
      IPAMConfig?: components["schemas"]["EndpointIPAMConfig"];
      /** @example [
       *       "container_1",
       *       "container_2"
       *     ] */
      Links?: string[];
      /**
       * @description MAC address for the endpoint on this network. The network driver might ignore this parameter.
       *
       * @example 02:42:ac:11:00:04
       */
      MacAddress?: string;
      /** @example [
       *       "server_x",
       *       "server_y"
       *     ] */
      Aliases?: string[];
      /**
       * @description DriverOpts is a mapping of driver options and values. These options
       *     are passed directly to the driver and are driver specific.
       *
       * @example {
       *       "com.example.some-label": "some-value",
       *       "com.example.some-other-label": "some-other-value"
       *     }
       */
      DriverOpts?: {
        [key: string]: string;
      } | null;
      /** @description This property determines which endpoint will provide the default
       *     gateway for a container. The endpoint with the highest priority will
       *     be used. If multiple endpoints have the same priority, endpoints are
       *     lexicographically sorted based on their network name, and the one
       *     that sorts first is picked.
       *      */
      GwPriority?: number;
      /**
       * @description Unique ID of the network.
       *
       * @example 08754567f1f40222263eab4102e1c733ae697e8e354aa9cd6e18d7402835292a
       */
      NetworkID?: string;
      /**
       * @description Unique ID for the service endpoint in a Sandbox.
       *
       * @example b88f5b905aabf2893f3cbc4ee42d1ea7980bbc0a92e2c8922b1e1795298afb0b
       */
      EndpointID?: string;
      /**
       * @description Gateway address for this network.
       *
       * @example 172.17.0.1
       */
      Gateway?: string;
      /**
       * @description IPv4 address.
       *
       * @example 172.17.0.4
       */
      IPAddress?: string;
      /**
       * @description Mask length of the IPv4 address.
       *
       * @example 16
       */
      IPPrefixLen?: number;
      /**
       * @description IPv6 gateway address.
       *
       * @example 2001:db8:2::100
       */
      IPv6Gateway?: string;
      /**
       * @description Global IPv6 address.
       *
       * @example 2001:db8::5689
       */
      GlobalIPv6Address?: string;
      /**
       * Format: int64
       * @description Mask length of the global IPv6 address.
       *
       * @example 64
       */
      GlobalIPv6PrefixLen?: number;
      /**
       * @description List of all DNS names an endpoint has on a specific network. This
       *     list is based on the container name, network aliases, container short
       *     ID, and hostname.
       *
       *     These DNS names are non-fully qualified but can contain several dots.
       *     You can get fully qualified DNS names by appending `.<network-name>`.
       *     For instance, if container name is `my.ctr` and the network is named
       *     `testnet`, `DNSNames` will contain `my.ctr` and the FQDN will be
       *     `my.ctr.testnet`.
       *
       * @example [
       *       "foobar",
       *       "server_x",
       *       "server_y",
       *       "my.ctr"
       *     ]
       */
      DNSNames?: string[];
    };
    /** @description EndpointIPAMConfig represents an endpoint's IPAM configuration.
     *      */
    EndpointIPAMConfig: {
      /** @example 172.20.30.33 */
      IPv4Address?: string;
      /** @example 2001:db8:abcd::3033 */
      IPv6Address?: string;
      /** @example [
       *       "169.254.34.68",
       *       "fe80::3468"
       *     ] */
      LinkLocalIPs?: string[];
    } | null;
    PluginMount: {
      /** @example some-mount */
      Name: string;
      /** @example This is a mount that's used by the plugin. */
      Description: string;
      Settable: string[];
      /** @example /var/lib/docker/plugins/ */
      Source: string;
      /** @example /mnt/state */
      Destination: string;
      /** @example bind */
      Type: string;
      /** @example [
       *       "rbind",
       *       "rw"
       *     ] */
      Options: string[];
    };
    PluginDevice: {
      Name: string;
      Description: string;
      Settable: string[];
      /** @example /dev/fuse */
      Path: string;
    };
    PluginEnv: {
      Name: string;
      Description: string;
      Settable: string[];
      Value: string;
    };
    PluginInterfaceType: {
      Prefix: string;
      Capability: string;
      Version: string;
    };
    /** @description Describes a permission the user has to accept upon installing
     *     the plugin.
     *      */
    PluginPrivilege: {
      /** @example network */
      Name?: string;
      Description?: string;
      /** @example [
       *       "host"
       *     ] */
      Value?: string[];
    };
    /** @description A plugin for the Engine API */
    Plugin: {
      /** @example 5724e2c8652da337ab2eedd19fc6fc0ec908e4bd907c7421bf6a8dfc70c4c078 */
      Id?: string;
      /** @example tiborvass/sample-volume-plugin */
      Name: string;
      /**
       * @description True if the plugin is running. False if the plugin is not running, only installed.
       * @example true
       */
      Enabled: boolean;
      /** @description Settings that can be modified by users. */
      Settings: {
        Mounts: components["schemas"]["PluginMount"][];
        /** @example [
         *       "DEBUG=0"
         *     ] */
        Env: string[];
        Args: string[];
        Devices: components["schemas"]["PluginDevice"][];
      };
      /**
       * @description plugin remote reference used to push/pull the plugin
       * @example localhost:5000/tiborvass/sample-volume-plugin:latest
       */
      PluginReference?: string;
      /** @description The config of a plugin. */
      Config: {
        /**
         * @description Docker Version used to create the plugin
         * @example 17.06.0-ce
         */
        DockerVersion?: string;
        /** @example A sample volume plugin for Docker */
        Description: string;
        /** @example https://docs.docker.com/engine/extend/plugins/ */
        Documentation: string;
        /** @description The interface between Docker and the plugin */
        Interface: {
          /** @example [
           *       "docker.volumedriver/1.0"
           *     ] */
          Types: components["schemas"]["PluginInterfaceType"][];
          /** @example plugins.sock */
          Socket: string;
          /**
           * @description Protocol to use for clients connecting to the plugin.
           * @example some.protocol/v1.0
           * @enum {string}
           */
          ProtocolScheme?: "" | "moby.plugins.http/v1";
        };
        /** @example [
         *       "/usr/bin/sample-volume-plugin",
         *       "/data"
         *     ] */
        Entrypoint: string[];
        /** @example /bin/ */
        WorkDir: string;
        User?: {
          /**
           * Format: uint32
           * @example 1000
           */
          UID?: number;
          /**
           * Format: uint32
           * @example 1000
           */
          GID?: number;
        };
        Network: {
          /** @example host */
          Type: string;
        };
        Linux: {
          /** @example [
           *       "CAP_SYS_ADMIN",
           *       "CAP_SYSLOG"
           *     ] */
          Capabilities: string[];
          /** @example false */
          AllowAllDevices: boolean;
          Devices: components["schemas"]["PluginDevice"][];
        };
        /** @example /mnt/volumes */
        PropagatedMount: string;
        /** @example false */
        IpcHost: boolean;
        /** @example false */
        PidHost: boolean;
        Mounts: components["schemas"]["PluginMount"][];
        /** @example [
         *       {
         *         "Name": "DEBUG",
         *         "Description": "If set, prints debug messages",
         *         "Value": "0"
         *       }
         *     ] */
        Env: components["schemas"]["PluginEnv"][];
        Args: {
          /** @example args */
          Name: string;
          /** @example command line arguments */
          Description: string;
          Settable: string[];
          Value: string[];
        };
        rootfs?: {
          /** @example layers */
          type?: string;
          /** @example [
           *       "sha256:675532206fbf3030b8458f88d6e26d4eb1577688a25efec97154c94e8b6b4887",
           *       "sha256:e216a057b1cb1efc11f8a268f37ef62083e70b1b38323ba252e25ac88904a7e8"
           *     ] */
          diff_ids?: string[];
        };
      };
    };
    /** @description The version number of the object such as node, service, etc. This is needed
     *     to avoid conflicting writes. The client must send the version number along
     *     with the modified specification when updating these objects.
     *
     *     This approach ensures safe concurrency and determinism in that the change
     *     on the object may not be applied if the version number has changed from the
     *     last read. In other words, if two update requests specify the same base
     *     version, only one of the requests can succeed. As a result, two separate
     *     update requests that happen at the same time will not unintentionally
     *     overwrite each other.
     *      */
    ObjectVersion: {
      /**
       * Format: uint64
       * @example 373531
       */
      Index?: number;
    };
    /** @example {
     *       "Availability": "active",
     *       "Name": "node-name",
     *       "Role": "manager",
     *       "Labels": {
     *         "foo": "bar"
     *       }
     *     } */
    NodeSpec: {
      /**
       * @description Name for the node.
       * @example my-node
       */
      Name?: string;
      /** @description User-defined key/value metadata. */
      Labels?: {
        [key: string]: string;
      };
      /**
       * @description Role of the node.
       * @example manager
       * @enum {string}
       */
      Role?: "worker" | "manager";
      /**
       * @description Availability of the node.
       * @example active
       * @enum {string}
       */
      Availability?: "active" | "pause" | "drain";
    };
    Node: {
      /** @example 24ifsmvkjbyhk */
      ID?: string;
      Version?: components["schemas"]["ObjectVersion"];
      /**
       * Format: dateTime
       * @description Date and time at which the node was added to the swarm in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2016-08-18T10:44:24.496525531Z
       */
      CreatedAt?: string;
      /**
       * Format: dateTime
       * @description Date and time at which the node was last updated in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2017-08-09T07:09:37.632105588Z
       */
      UpdatedAt?: string;
      Spec?: components["schemas"]["NodeSpec"];
      Description?: components["schemas"]["NodeDescription"];
      Status?: components["schemas"]["NodeStatus"];
      ManagerStatus?: components["schemas"]["ManagerStatus"];
    };
    /** @description NodeDescription encapsulates the properties of the Node as reported by the
     *     agent.
     *      */
    NodeDescription: {
      /** @example bf3067039e47 */
      Hostname?: string;
      Platform?: components["schemas"]["Platform"];
      Resources?: components["schemas"]["ResourceObject"];
      Engine?: components["schemas"]["EngineDescription"];
      TLSInfo?: components["schemas"]["TLSInfo"];
    };
    /** @description Platform represents the platform (Arch/OS).
     *      */
    Platform: {
      /**
       * @description Architecture represents the hardware architecture (for example,
       *     `x86_64`).
       *
       * @example x86_64
       */
      Architecture?: string;
      /**
       * @description OS represents the Operating System (for example, `linux` or `windows`).
       *
       * @example linux
       */
      OS?: string;
    };
    /** @description EngineDescription provides information about an engine. */
    EngineDescription: {
      /** @example 17.06.0 */
      EngineVersion?: string;
      /** @example {
       *       "foo": "bar"
       *     } */
      Labels?: {
        [key: string]: string;
      };
      /** @example [
       *       {
       *         "Type": "Log",
       *         "Name": "awslogs"
       *       },
       *       {
       *         "Type": "Log",
       *         "Name": "fluentd"
       *       },
       *       {
       *         "Type": "Log",
       *         "Name": "gcplogs"
       *       },
       *       {
       *         "Type": "Log",
       *         "Name": "gelf"
       *       },
       *       {
       *         "Type": "Log",
       *         "Name": "journald"
       *       },
       *       {
       *         "Type": "Log",
       *         "Name": "json-file"
       *       },
       *       {
       *         "Type": "Log",
       *         "Name": "splunk"
       *       },
       *       {
       *         "Type": "Log",
       *         "Name": "syslog"
       *       },
       *       {
       *         "Type": "Network",
       *         "Name": "bridge"
       *       },
       *       {
       *         "Type": "Network",
       *         "Name": "host"
       *       },
       *       {
       *         "Type": "Network",
       *         "Name": "ipvlan"
       *       },
       *       {
       *         "Type": "Network",
       *         "Name": "macvlan"
       *       },
       *       {
       *         "Type": "Network",
       *         "Name": "null"
       *       },
       *       {
       *         "Type": "Network",
       *         "Name": "overlay"
       *       },
       *       {
       *         "Type": "Volume",
       *         "Name": "local"
       *       },
       *       {
       *         "Type": "Volume",
       *         "Name": "localhost:5000/vieux/sshfs:latest"
       *       },
       *       {
       *         "Type": "Volume",
       *         "Name": "vieux/sshfs:latest"
       *       }
       *     ] */
      Plugins?: {
        Type?: string;
        Name?: string;
      }[];
    };
    /**
     * @description Information about the issuer of leaf TLS certificates and the trusted root
     *     CA certificate.
     *
     * @example {
     *       "TrustRoot": "-----BEGIN CERTIFICATE-----\nMIIBajCCARCgAwIBAgIUbYqrLSOSQHoxD8CwG6Bi2PJi9c8wCgYIKoZIzj0EAwIw\nEzERMA8GA1UEAxMIc3dhcm0tY2EwHhcNMTcwNDI0MjE0MzAwWhcNMzcwNDE5MjE0\nMzAwWjATMREwDwYDVQQDEwhzd2FybS1jYTBZMBMGByqGSM49AgEGCCqGSM49AwEH\nA0IABJk/VyMPYdaqDXJb/VXh5n/1Yuv7iNrxV3Qb3l06XD46seovcDWs3IZNV1lf\n3Skyr0ofcchipoiHkXBODojJydSjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMB\nAf8EBTADAQH/MB0GA1UdDgQWBBRUXxuRcnFjDfR/RIAUQab8ZV/n4jAKBggqhkjO\nPQQDAgNIADBFAiAy+JTe6Uc3KyLCMiqGl2GyWGQqQDEcO3/YG36x7om65AIhAJvz\npxv6zFeVEkAEEkqIYi0omA9+CjanB/6Bz4n1uw8H\n-----END CERTIFICATE-----\n",
     *       "CertIssuerSubject": "MBMxETAPBgNVBAMTCHN3YXJtLWNh",
     *       "CertIssuerPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEmT9XIw9h1qoNclv9VeHmf/Vi6/uI2vFXdBveXTpcPjqx6i9wNazchk1XWV/dKTKvSh9xyGKmiIeRcE4OiMnJ1A=="
     *     }
     */
    TLSInfo: {
      /** @description The root CA certificate(s) that are used to validate leaf TLS
       *     certificates.
       *      */
      TrustRoot?: string;
      /** @description The base64-url-safe-encoded raw subject bytes of the issuer. */
      CertIssuerSubject?: string;
      /** @description The base64-url-safe-encoded raw public key bytes of the issuer.
       *      */
      CertIssuerPublicKey?: string;
    };
    /** @description NodeStatus represents the status of a node.
     *
     *     It provides the current status of the node, as seen by the manager.
     *      */
    NodeStatus: {
      State?: components["schemas"]["NodeState"];
      /** @example  */
      Message?: string;
      /**
       * @description IP address of the node.
       * @example 172.17.0.2
       */
      Addr?: string;
    };
    /**
     * @description NodeState represents the state of a node.
     * @example ready
     * @enum {string}
     */
    NodeState: "unknown" | "down" | "ready" | "disconnected";
    /** @description ManagerStatus represents the status of a manager.
     *
     *     It provides the current status of a node's manager component, if the node
     *     is a manager.
     *      */
    ManagerStatus: {
      /**
       * @default false
       * @example true
       */
      Leader: boolean;
      Reachability?: components["schemas"]["Reachability"];
      /**
       * @description The IP address and port at which the manager is reachable.
       *
       * @example 10.0.0.46:2377
       */
      Addr?: string;
    } | null;
    /**
     * @description Reachability represents the reachability of a node.
     * @example reachable
     * @enum {string}
     */
    Reachability: "unknown" | "unreachable" | "reachable";
    /** @description User modifiable swarm configuration. */
    SwarmSpec: {
      /**
       * @description Name of the swarm.
       * @example default
       */
      Name?: string;
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.corp.type": "production",
       *       "com.example.corp.department": "engineering"
       *     }
       */
      Labels?: {
        [key: string]: string;
      };
      /** @description Orchestration configuration. */
      Orchestration?: {
        /**
         * Format: int64
         * @description The number of historic tasks to keep per instance or node. If
         *     negative, never remove completed or failed tasks.
         *
         * @example 10
         */
        TaskHistoryRetentionLimit?: number;
      } | null;
      /** @description Raft configuration. */
      Raft?: {
        /**
         * Format: uint64
         * @description The number of log entries between snapshots.
         * @example 10000
         */
        SnapshotInterval?: number;
        /**
         * Format: uint64
         * @description The number of snapshots to keep beyond the current snapshot.
         *
         */
        KeepOldSnapshots?: number;
        /**
         * Format: uint64
         * @description The number of log entries to keep around to sync up slow followers
         *     after a snapshot is created.
         *
         * @example 500
         */
        LogEntriesForSlowFollowers?: number;
        /**
         * @description The number of ticks that a follower will wait for a message from
         *     the leader before becoming a candidate and starting an election.
         *     `ElectionTick` must be greater than `HeartbeatTick`.
         *
         *     A tick currently defaults to one second, so these translate
         *     directly to seconds currently, but this is NOT guaranteed.
         *
         * @example 3
         */
        ElectionTick?: number;
        /**
         * @description The number of ticks between heartbeats. Every HeartbeatTick ticks,
         *     the leader will send a heartbeat to the followers.
         *
         *     A tick currently defaults to one second, so these translate
         *     directly to seconds currently, but this is NOT guaranteed.
         *
         * @example 1
         */
        HeartbeatTick?: number;
      };
      /** @description Dispatcher configuration. */
      Dispatcher?: {
        /**
         * Format: int64
         * @description The delay for an agent to send a heartbeat to the dispatcher.
         *
         * @example 5000000000
         */
        HeartbeatPeriod?: number;
      } | null;
      /** @description CA configuration. */
      CAConfig?: {
        /**
         * Format: int64
         * @description The duration node certificates are issued for.
         * @example 7776000000000000
         */
        NodeCertExpiry?: number;
        /** @description Configuration for forwarding signing requests to an external
         *     certificate authority.
         *      */
        ExternalCAs?: {
          /**
           * @description Protocol for communication with the external CA (currently
           *     only `cfssl` is supported).
           *
           * @default cfssl
           * @enum {string}
           */
          Protocol: "cfssl";
          /** @description URL where certificate signing requests should be sent.
           *      */
          URL?: string;
          /** @description An object with key/value pairs that are interpreted as
           *     protocol-specific options for the external CA driver.
           *      */
          Options?: {
            [key: string]: string;
          };
          /** @description The root CA certificate (in PEM format) this external CA uses
           *     to issue TLS certificates (assumed to be to the current swarm
           *     root CA certificate if not provided).
           *      */
          CACert?: string;
        }[];
        /** @description The desired signing CA certificate for all swarm node TLS leaf
         *     certificates, in PEM format.
         *      */
        SigningCACert?: string;
        /** @description The desired signing CA key for all swarm node TLS leaf certificates,
         *     in PEM format.
         *      */
        SigningCAKey?: string;
        /**
         * Format: uint64
         * @description An integer whose purpose is to force swarm to generate a new
         *     signing CA certificate and key, if none have been specified in
         *     `SigningCACert` and `SigningCAKey`
         *
         */
        ForceRotate?: number;
      } | null;
      /** @description Parameters related to encryption-at-rest. */
      EncryptionConfig?: {
        /**
         * @description If set, generate a key and use it to lock data stored on the
         *     managers.
         *
         * @example false
         */
        AutoLockManagers?: boolean;
      };
      /** @description Defaults for creating tasks in this cluster. */
      TaskDefaults?: {
        /** @description The log driver to use for tasks created in the orchestrator if
         *     unspecified by a service.
         *
         *     Updating this value only affects new tasks. Existing tasks continue
         *     to use their previously configured log driver until recreated.
         *      */
        LogDriver?: {
          /**
           * @description The log driver to use as a default for new tasks.
           *
           * @example json-file
           */
          Name?: string;
          /**
           * @description Driver-specific options for the selected log driver, specified
           *     as key/value pairs.
           *
           * @example {
           *       "max-file": "10",
           *       "max-size": "100m"
           *     }
           */
          Options?: {
            [key: string]: string;
          };
        };
      };
    };
    /** @description ClusterInfo represents information about the swarm as is returned by the
     *     "/info" endpoint. Join-tokens are not included.
     *      */
    ClusterInfo: {
      /**
       * @description The ID of the swarm.
       * @example abajmipo7b4xz5ip2nrla6b11
       */
      ID?: string;
      Version?: components["schemas"]["ObjectVersion"];
      /**
       * Format: dateTime
       * @description Date and time at which the swarm was initialised in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2016-08-18T10:44:24.496525531Z
       */
      CreatedAt?: string;
      /**
       * Format: dateTime
       * @description Date and time at which the swarm was last updated in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       *
       * @example 2017-08-09T07:09:37.632105588Z
       */
      UpdatedAt?: string;
      Spec?: components["schemas"]["SwarmSpec"];
      TLSInfo?: components["schemas"]["TLSInfo"];
      /**
       * @description Whether there is currently a root CA rotation in progress for the swarm
       *
       * @example false
       */
      RootRotationInProgress?: boolean;
      /**
       * Format: uint32
       * @description DataPathPort specifies the data path port number for data traffic.
       *     Acceptable port range is 1024 to 49151.
       *     If no port is set or is set to 0, the default port (4789) is used.
       *
       * @example 4789
       */
      DataPathPort?: number;
      /** @description Default Address Pool specifies default subnet pools for global scope
       *     networks.
       *      */
      DefaultAddrPool?: string[];
      /**
       * Format: uint32
       * @description SubnetSize specifies the subnet size of the networks created from the
       *     default subnet pool.
       *
       * @example 24
       */
      SubnetSize?: number;
    } | null;
    /** @description JoinTokens contains the tokens workers and managers need to join the swarm.
     *      */
    JoinTokens: {
      /**
       * @description The token workers can use to join the swarm.
       *
       * @example SWMTKN-1-3pu6hszjas19xyp7ghgosyx9k8atbfcr8p2is99znpy26u2lkl-1awxwuwd3z9j1z3puu7rcgdbx
       */
      Worker?: string;
      /**
       * @description The token managers can use to join the swarm.
       *
       * @example SWMTKN-1-3pu6hszjas19xyp7ghgosyx9k8atbfcr8p2is99znpy26u2lkl-7p73s1dx5in4tatdymyhg9hu2
       */
      Manager?: string;
    };
    Swarm: components["schemas"]["ClusterInfo"] & {
      JoinTokens?: components["schemas"]["JoinTokens"];
    };
    /** @description User modifiable task configuration. */
    TaskSpec: {
      /** @description Plugin spec for the service.  *(Experimental release only.)*
       *
       *     <p><br /></p>
       *
       *     > **Note**: ContainerSpec, NetworkAttachmentSpec, and PluginSpec are
       *     > mutually exclusive. PluginSpec is only used when the Runtime field
       *     > is set to `plugin`. NetworkAttachmentSpec is used when the Runtime
       *     > field is set to `attachment`.
       *      */
      PluginSpec?: {
        /** @description The name or 'alias' to use for the plugin. */
        Name?: string;
        /** @description The plugin image reference to use. */
        Remote?: string;
        /** @description Disable the plugin once scheduled. */
        Disabled?: boolean;
        PluginPrivilege?: components["schemas"]["PluginPrivilege"][];
      };
      /** @description Container spec for the service.
       *
       *     <p><br /></p>
       *
       *     > **Note**: ContainerSpec, NetworkAttachmentSpec, and PluginSpec are
       *     > mutually exclusive. PluginSpec is only used when the Runtime field
       *     > is set to `plugin`. NetworkAttachmentSpec is used when the Runtime
       *     > field is set to `attachment`.
       *      */
      ContainerSpec?: {
        /** @description The image name to use for the container */
        Image?: string;
        /** @description User-defined key/value data. */
        Labels?: {
          [key: string]: string;
        };
        /** @description The command to be run in the image. */
        Command?: string[];
        /** @description Arguments to the command. */
        Args?: string[];
        /** @description The hostname to use for the container, as a valid
         *     [RFC 1123](https://tools.ietf.org/html/rfc1123) hostname.
         *      */
        Hostname?: string;
        /** @description A list of environment variables in the form `VAR=value`.
         *      */
        Env?: string[];
        /** @description The working directory for commands to run in. */
        Dir?: string;
        /** @description The user inside the container. */
        User?: string;
        /** @description A list of additional groups that the container process will run as.
         *      */
        Groups?: string[];
        /** @description Security options for the container */
        Privileges?: {
          /** @description CredentialSpec for managed service account (Windows only) */
          CredentialSpec?: {
            /**
             * @description Load credential spec from a Swarm Config with the given ID.
             *     The specified config must also be present in the Configs
             *     field with the Runtime property set.
             *
             *     <p><br /></p>
             *
             *
             *     > **Note**: `CredentialSpec.File`, `CredentialSpec.Registry`,
             *     > and `CredentialSpec.Config` are mutually exclusive.
             *
             * @example 0bt9dmxjvjiqermk6xrop3ekq
             */
            Config?: string;
            /**
             * @description Load credential spec from this file. The file is read by
             *     the daemon, and must be present in the `CredentialSpecs`
             *     subdirectory in the docker data directory, which defaults
             *     to `C:\ProgramData\Docker\` on Windows.
             *
             *     For example, specifying `spec.json` loads
             *     `C:\ProgramData\Docker\CredentialSpecs\spec.json`.
             *
             *     <p><br /></p>
             *
             *     > **Note**: `CredentialSpec.File`, `CredentialSpec.Registry`,
             *     > and `CredentialSpec.Config` are mutually exclusive.
             *
             * @example spec.json
             */
            File?: string;
            /** @description Load credential spec from this value in the Windows
             *     registry. The specified registry value must be located in:
             *
             *     `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Virtualization\Containers\CredentialSpecs`
             *
             *     <p><br /></p>
             *
             *
             *     > **Note**: `CredentialSpec.File`, `CredentialSpec.Registry`,
             *     > and `CredentialSpec.Config` are mutually exclusive.
             *      */
            Registry?: string;
          };
          /** @description SELinux labels of the container */
          SELinuxContext?: {
            /** @description Disable SELinux */
            Disable?: boolean;
            /** @description SELinux user label */
            User?: string;
            /** @description SELinux role label */
            Role?: string;
            /** @description SELinux type label */
            Type?: string;
            /** @description SELinux level label */
            Level?: string;
          };
          /** @description Options for configuring seccomp on the container */
          Seccomp?: {
            /** @enum {string} */
            Mode?: "default" | "unconfined" | "custom";
            /** @description The custom seccomp profile as a json object */
            Profile?: string;
          };
          /** @description Options for configuring AppArmor on the container */
          AppArmor?: {
            /** @enum {string} */
            Mode?: "default" | "disabled";
          };
          /** @description Configuration of the no_new_privs bit in the container */
          NoNewPrivileges?: boolean;
        };
        /** @description Whether a pseudo-TTY should be allocated. */
        TTY?: boolean;
        /** @description Open `stdin` */
        OpenStdin?: boolean;
        /** @description Mount the container's root filesystem as read only. */
        ReadOnly?: boolean;
        /** @description Specification for mounts to be added to containers created as part
         *     of the service.
         *      */
        Mounts?: components["schemas"]["Mount"][];
        /** @description Signal to stop the container. */
        StopSignal?: string;
        /**
         * Format: int64
         * @description Amount of time to wait for the container to terminate before
         *     forcefully killing it.
         *
         */
        StopGracePeriod?: number;
        HealthCheck?: components["schemas"]["HealthConfig"];
        /** @description A list of hostname/IP mappings to add to the container's `hosts`
         *     file. The format of extra hosts is specified in the
         *     [hosts(5)](http://man7.org/linux/man-pages/man5/hosts.5.html)
         *     man page:
         *
         *         IP_address canonical_hostname [aliases...]
         *      */
        Hosts?: string[];
        /** @description Specification for DNS related configurations in resolver configuration
         *     file (`resolv.conf`).
         *      */
        DNSConfig?: {
          /** @description The IP addresses of the name servers. */
          Nameservers?: string[];
          /** @description A search list for host-name lookup. */
          Search?: string[];
          /** @description A list of internal resolver variables to be modified (e.g.,
           *     `debug`, `ndots:3`, etc.).
           *      */
          Options?: string[];
        };
        /** @description Secrets contains references to zero or more secrets that will be
         *     exposed to the service.
         *      */
        Secrets?: {
          /** @description File represents a specific target that is backed by a file.
           *      */
          File?: {
            /** @description Name represents the final filename in the filesystem.
             *      */
            Name?: string;
            /** @description UID represents the file UID. */
            UID?: string;
            /** @description GID represents the file GID. */
            GID?: string;
            /**
             * Format: uint32
             * @description Mode represents the FileMode of the file.
             */
            Mode?: number;
          };
          /** @description SecretID represents the ID of the specific secret that we're
           *     referencing.
           *      */
          SecretID?: string;
          /** @description SecretName is the name of the secret that this references,
           *     but this is just provided for lookup/display purposes. The
           *     secret in the reference will be identified by its ID.
           *      */
          SecretName?: string;
        }[];
        /**
         * Format: int64
         * @description An integer value containing the score given to the container in
         *     order to tune OOM killer preferences.
         *
         * @example 0
         */
        OomScoreAdj?: number;
        /** @description Configs contains references to zero or more configs that will be
         *     exposed to the service.
         *      */
        Configs?: {
          /** @description File represents a specific target that is backed by a file.
           *
           *     <p><br /><p>
           *
           *     > **Note**: `Configs.File` and `Configs.Runtime` are mutually exclusive
           *      */
          File?: {
            /** @description Name represents the final filename in the filesystem.
             *      */
            Name?: string;
            /** @description UID represents the file UID. */
            UID?: string;
            /** @description GID represents the file GID. */
            GID?: string;
            /**
             * Format: uint32
             * @description Mode represents the FileMode of the file.
             */
            Mode?: number;
          };
          /** @description Runtime represents a target that is not mounted into the
           *     container but is used by the task
           *
           *     <p><br /><p>
           *
           *     > **Note**: `Configs.File` and `Configs.Runtime` are mutually
           *     > exclusive
           *      */
          Runtime?: Record<string, never>;
          /** @description ConfigID represents the ID of the specific config that we're
           *     referencing.
           *      */
          ConfigID?: string;
          /** @description ConfigName is the name of the config that this references,
           *     but this is just provided for lookup/display purposes. The
           *     config in the reference will be identified by its ID.
           *      */
          ConfigName?: string;
        }[];
        /**
         * @description Isolation technology of the containers running the service.
         *     (Windows only)
         *
         * @enum {string}
         */
        Isolation?: "default" | "process" | "hyperv" | "";
        /** @description Run an init inside the container that forwards signals and reaps
         *     processes. This field is omitted if empty, and the default (as
         *     configured on the daemon) is used.
         *      */
        Init?: boolean | null;
        /** @description Set kernel namedspaced parameters (sysctls) in the container.
         *     The Sysctls option on services accepts the same sysctls as the
         *     are supported on containers. Note that while the same sysctls are
         *     supported, no guarantees or checks are made about their
         *     suitability for a clustered environment, and it's up to the user
         *     to determine whether a given sysctl will work properly in a
         *     Service.
         *      */
        Sysctls?: {
          [key: string]: string;
        };
        /**
         * @description A list of kernel capabilities to add to the default set
         *     for the container.
         *
         * @example [
         *       "CAP_NET_RAW",
         *       "CAP_SYS_ADMIN",
         *       "CAP_SYS_CHROOT",
         *       "CAP_SYSLOG"
         *     ]
         */
        CapabilityAdd?: string[];
        /**
         * @description A list of kernel capabilities to drop from the default set
         *     for the container.
         *
         * @example [
         *       "CAP_NET_RAW"
         *     ]
         */
        CapabilityDrop?: string[];
        /** @description A list of resource limits to set in the container. For example: `{"Name": "nofile", "Soft": 1024, "Hard": 2048}`"
         *      */
        Ulimits?: {
          /** @description Name of ulimit */
          Name?: string;
          /** @description Soft limit */
          Soft?: number;
          /** @description Hard limit */
          Hard?: number;
        }[];
      };
      /** @description Read-only spec type for non-swarm containers attached to swarm overlay
       *     networks.
       *
       *     <p><br /></p>
       *
       *     > **Note**: ContainerSpec, NetworkAttachmentSpec, and PluginSpec are
       *     > mutually exclusive. PluginSpec is only used when the Runtime field
       *     > is set to `plugin`. NetworkAttachmentSpec is used when the Runtime
       *     > field is set to `attachment`.
       *      */
      NetworkAttachmentSpec?: {
        /** @description ID of the container represented by this task */
        ContainerID?: string;
      };
      /** @description Resource requirements which apply to each individual container created
       *     as part of the service.
       *      */
      Resources?: {
        Limits?: components["schemas"]["Limit"];
        Reservations?: components["schemas"]["ResourceObject"];
      };
      /** @description Specification for the restart policy which applies to containers
       *     created as part of this service.
       *      */
      RestartPolicy?: {
        /**
         * @description Condition for restart.
         * @enum {string}
         */
        Condition?: "none" | "on-failure" | "any";
        /**
         * Format: int64
         * @description Delay between restart attempts.
         */
        Delay?: number;
        /**
         * Format: int64
         * @description Maximum attempts to restart a given container before giving up
         *     (default value is 0, which is ignored).
         *
         * @default 0
         */
        MaxAttempts: number;
        /**
         * Format: int64
         * @description Windows is the time window used to evaluate the restart policy
         *     (default value is 0, which is unbounded).
         *
         * @default 0
         */
        Window: number;
      };
      Placement?: {
        /**
         * @description An array of constraint expressions to limit the set of nodes where
         *     a task can be scheduled. Constraint expressions can either use a
         *     _match_ (`==`) or _exclude_ (`!=`) rule. Multiple constraints find
         *     nodes that satisfy every expression (AND match). Constraints can
         *     match node or Docker Engine labels as follows:
         *
         *     node attribute       | matches                        | example
         *     ---------------------|--------------------------------|-----------------------------------------------
         *     `node.id`            | Node ID                        | `node.id==2ivku8v2gvtg4`
         *     `node.hostname`      | Node hostname                  | `node.hostname!=node-2`
         *     `node.role`          | Node role (`manager`/`worker`) | `node.role==manager`
         *     `node.platform.os`   | Node operating system          | `node.platform.os==windows`
         *     `node.platform.arch` | Node architecture              | `node.platform.arch==x86_64`
         *     `node.labels`        | User-defined node labels       | `node.labels.security==high`
         *     `engine.labels`      | Docker Engine's labels         | `engine.labels.operatingsystem==ubuntu-24.04`
         *
         *     `engine.labels` apply to Docker Engine labels like operating system,
         *     drivers, etc. Swarm administrators add `node.labels` for operational
         *     purposes by using the [`node update endpoint`](#operation/NodeUpdate).
         *
         * @example [
         *       "node.hostname!=node3.corp.example.com",
         *       "node.role!=manager",
         *       "node.labels.type==production",
         *       "node.platform.os==linux",
         *       "node.platform.arch==x86_64"
         *     ]
         */
        Constraints?: string[];
        /**
         * @description Preferences provide a way to make the scheduler aware of factors
         *     such as topology. They are provided in order from highest to
         *     lowest precedence.
         *
         * @example [
         *       {
         *         "Spread": {
         *           "SpreadDescriptor": "node.labels.datacenter"
         *         }
         *       },
         *       {
         *         "Spread": {
         *           "SpreadDescriptor": "node.labels.rack"
         *         }
         *       }
         *     ]
         */
        Preferences?: {
          Spread?: {
            /** @description label descriptor, such as `engine.labels.az`.
             *      */
            SpreadDescriptor?: string;
          };
        }[];
        /**
         * Format: int64
         * @description Maximum number of replicas for per node (default value is 0, which
         *     is unlimited)
         *
         * @default 0
         */
        MaxReplicas: number;
        /** @description Platforms stores all the platforms that the service's image can
         *     run on. This field is used in the platform filter for scheduling.
         *     If empty, then the platform filter is off, meaning there are no
         *     scheduling restrictions.
         *      */
        Platforms?: components["schemas"]["Platform"][];
      };
      /** @description A counter that triggers an update even if no relevant parameters have
       *     been changed.
       *      */
      ForceUpdate?: number;
      /** @description Runtime is the type of runtime specified for the task executor.
       *      */
      Runtime?: string;
      /** @description Specifies which networks the service should attach to. */
      Networks?: components["schemas"]["NetworkAttachmentConfig"][];
      /** @description Specifies the log driver to use for tasks created from this spec. If
       *     not present, the default one for the swarm will be used, finally
       *     falling back to the engine default if not specified.
       *      */
      LogDriver?: {
        Name?: string;
        Options?: {
          [key: string]: string;
        };
      };
    };
    /** @enum {string} */
    TaskState:
      | "new"
      | "allocated"
      | "pending"
      | "assigned"
      | "accepted"
      | "preparing"
      | "ready"
      | "starting"
      | "running"
      | "complete"
      | "shutdown"
      | "failed"
      | "rejected"
      | "remove"
      | "orphaned";
    /** @description represents the status of a container. */
    ContainerStatus: {
      ContainerID?: string;
      PID?: number;
      ExitCode?: number;
    };
    /** @description represents the port status of a task's host ports whose service has published host ports */
    PortStatus: {
      Ports?: components["schemas"]["EndpointPortConfig"][];
    };
    /** @description represents the status of a task. */
    TaskStatus: {
      /** Format: dateTime */
      Timestamp?: string;
      State?: components["schemas"]["TaskState"];
      Message?: string;
      Err?: string;
      ContainerStatus?: components["schemas"]["ContainerStatus"];
      PortStatus?: components["schemas"]["PortStatus"];
    };
    /** @example {
     *       "ID": "0kzzo1i0y4jz6027t0k7aezc7",
     *       "Version": {
     *         "Index": 71
     *       },
     *       "CreatedAt": "2016-06-07T21:07:31.171892745Z",
     *       "UpdatedAt": "2016-06-07T21:07:31.376370513Z",
     *       "Spec": {
     *         "ContainerSpec": {
     *           "Image": "redis"
     *         },
     *         "Resources": {
     *           "Limits": {},
     *           "Reservations": {}
     *         },
     *         "RestartPolicy": {
     *           "Condition": "any",
     *           "MaxAttempts": 0
     *         },
     *         "Placement": {}
     *       },
     *       "ServiceID": "9mnpnzenvg8p8tdbtq4wvbkcz",
     *       "Slot": 1,
     *       "NodeID": "60gvrl6tm78dmak4yl7srz94v",
     *       "Status": {
     *         "Timestamp": "2016-06-07T21:07:31.290032978Z",
     *         "State": "running",
     *         "Message": "started",
     *         "ContainerStatus": {
     *           "ContainerID": "e5d62702a1b48d01c3e02ca1e0212a250801fa8d67caca0b6f35919ebc12f035",
     *           "PID": 677
     *         }
     *       },
     *       "DesiredState": "running",
     *       "NetworksAttachments": [
     *         {
     *           "Network": {
     *             "ID": "4qvuz4ko70xaltuqbt8956gd1",
     *             "Version": {
     *               "Index": 18
     *             },
     *             "CreatedAt": "2016-06-07T20:31:11.912919752Z",
     *             "UpdatedAt": "2016-06-07T21:07:29.955277358Z",
     *             "Spec": {
     *               "Name": "ingress",
     *               "Labels": {
     *                 "com.docker.swarm.internal": "true"
     *               },
     *               "DriverConfiguration": {},
     *               "IPAMOptions": {
     *                 "Driver": {},
     *                 "Configs": [
     *                   {
     *                     "Subnet": "10.255.0.0/16",
     *                     "Gateway": "10.255.0.1"
     *                   }
     *                 ]
     *               }
     *             },
     *             "DriverState": {
     *               "Name": "overlay",
     *               "Options": {
     *                 "com.docker.network.driver.overlay.vxlanid_list": "256"
     *               }
     *             },
     *             "IPAMOptions": {
     *               "Driver": {
     *                 "Name": "default"
     *               },
     *               "Configs": [
     *                 {
     *                   "Subnet": "10.255.0.0/16",
     *                   "Gateway": "10.255.0.1"
     *                 }
     *               ]
     *             }
     *           },
     *           "Addresses": [
     *             "10.255.0.10/16"
     *           ]
     *         }
     *       ],
     *       "AssignedGenericResources": [
     *         {
     *           "DiscreteResourceSpec": {
     *             "Kind": "SSD",
     *             "Value": 3
     *           }
     *         },
     *         {
     *           "NamedResourceSpec": {
     *             "Kind": "GPU",
     *             "Value": "UUID1"
     *           }
     *         },
     *         {
     *           "NamedResourceSpec": {
     *             "Kind": "GPU",
     *             "Value": "UUID2"
     *           }
     *         }
     *       ]
     *     } */
    Task: {
      /** @description The ID of the task. */
      ID?: string;
      Version?: components["schemas"]["ObjectVersion"];
      /** Format: dateTime */
      CreatedAt?: string;
      /** Format: dateTime */
      UpdatedAt?: string;
      /** @description Name of the task. */
      Name?: string;
      /** @description User-defined key/value metadata. */
      Labels?: {
        [key: string]: string;
      };
      Spec?: components["schemas"]["TaskSpec"];
      /** @description The ID of the service this task is part of. */
      ServiceID?: string;
      Slot?: number;
      /** @description The ID of the node that this task is on. */
      NodeID?: string;
      AssignedGenericResources?: components["schemas"]["GenericResources"];
      Status?: components["schemas"]["TaskStatus"];
      DesiredState?: components["schemas"]["TaskState"];
      JobIteration?: components["schemas"]["ObjectVersion"];
    };
    /** @description User modifiable configuration for a service. */
    ServiceSpec: {
      /** @description Name of the service. */
      Name?: string;
      /** @description User-defined key/value metadata. */
      Labels?: {
        [key: string]: string;
      };
      TaskTemplate?: components["schemas"]["TaskSpec"];
      /** @description Scheduling mode for the service. */
      Mode?: {
        Replicated?: {
          /** Format: int64 */
          Replicas?: number;
        };
        Global?: Record<string, never>;
        /** @description The mode used for services with a finite number of tasks that run
         *     to a completed state.
         *      */
        ReplicatedJob?: {
          /**
           * Format: int64
           * @description The maximum number of replicas to run simultaneously.
           *
           * @default 1
           */
          MaxConcurrent: number;
          /**
           * Format: int64
           * @description The total number of replicas desired to reach the Completed
           *     state. If unset, will default to the value of `MaxConcurrent`
           *
           */
          TotalCompletions?: number;
        };
        /** @description The mode used for services which run a task to the completed state
         *     on each valid node.
         *      */
        GlobalJob?: Record<string, never>;
      };
      /** @description Specification for the update strategy of the service. */
      UpdateConfig?: {
        /**
         * Format: int64
         * @description Maximum number of tasks to be updated in one iteration (0 means
         *     unlimited parallelism).
         *
         */
        Parallelism?: number;
        /**
         * Format: int64
         * @description Amount of time between updates, in nanoseconds.
         */
        Delay?: number;
        /**
         * @description Action to take if an updated task fails to run, or stops running
         *     during the update.
         *
         * @enum {string}
         */
        FailureAction?: "continue" | "pause" | "rollback";
        /**
         * Format: int64
         * @description Amount of time to monitor each updated task for failures, in
         *     nanoseconds.
         *
         */
        Monitor?: number;
        /** @description The fraction of tasks that may fail during an update before the
         *     failure action is invoked, specified as a floating point number
         *     between 0 and 1.
         *      */
        MaxFailureRatio?: number;
        /**
         * @description The order of operations when rolling out an updated task. Either
         *     the old task is shut down before the new task is started, or the
         *     new task is started before the old task is shut down.
         *
         * @enum {string}
         */
        Order?: "stop-first" | "start-first";
      };
      /** @description Specification for the rollback strategy of the service. */
      RollbackConfig?: {
        /**
         * Format: int64
         * @description Maximum number of tasks to be rolled back in one iteration (0 means
         *     unlimited parallelism).
         *
         */
        Parallelism?: number;
        /**
         * Format: int64
         * @description Amount of time between rollback iterations, in nanoseconds.
         *
         */
        Delay?: number;
        /**
         * @description Action to take if an rolled back task fails to run, or stops
         *     running during the rollback.
         *
         * @enum {string}
         */
        FailureAction?: "continue" | "pause";
        /**
         * Format: int64
         * @description Amount of time to monitor each rolled back task for failures, in
         *     nanoseconds.
         *
         */
        Monitor?: number;
        /** @description The fraction of tasks that may fail during a rollback before the
         *     failure action is invoked, specified as a floating point number
         *     between 0 and 1.
         *      */
        MaxFailureRatio?: number;
        /**
         * @description The order of operations when rolling back a task. Either the old
         *     task is shut down before the new task is started, or the new task
         *     is started before the old task is shut down.
         *
         * @enum {string}
         */
        Order?: "stop-first" | "start-first";
      };
      /** @description Specifies which networks the service should attach to.
       *
       *     Deprecated: This field is deprecated since v1.44. The Networks field in TaskSpec should be used instead.
       *      */
      Networks?: components["schemas"]["NetworkAttachmentConfig"][];
      EndpointSpec?: components["schemas"]["EndpointSpec"];
    };
    EndpointPortConfig: {
      Name?: string;
      /** @enum {string} */
      Protocol?: "tcp" | "udp" | "sctp";
      /** @description The port inside the container. */
      TargetPort?: number;
      /** @description The port on the swarm hosts. */
      PublishedPort?: number;
      /**
       * @description The mode in which port is published.
       *
       *     <p><br /></p>
       *
       *     - "ingress" makes the target port accessible on every node,
       *       regardless of whether there is a task for the service running on
       *       that node or not.
       *     - "host" bypasses the routing mesh and publish the port directly on
       *       the swarm node where that service is running.
       *
       * @default ingress
       * @example ingress
       * @enum {string}
       */
      PublishMode: "ingress" | "host";
    };
    /** @description Properties that can be configured to access and load balance a service. */
    EndpointSpec: {
      /**
       * @description The mode of resolution to use for internal load balancing between tasks.
       *
       * @default vip
       * @enum {string}
       */
      Mode: "vip" | "dnsrr";
      /** @description List of exposed ports that this service is accessible on from the
       *     outside. Ports can only be provided if `vip` resolution mode is used.
       *      */
      Ports?: components["schemas"]["EndpointPortConfig"][];
    };
    /** @example {
     *       "ID": "9mnpnzenvg8p8tdbtq4wvbkcz",
     *       "Version": {
     *         "Index": 19
     *       },
     *       "CreatedAt": "2016-06-07T21:05:51.880065305Z",
     *       "UpdatedAt": "2016-06-07T21:07:29.962229872Z",
     *       "Spec": {
     *         "Name": "hopeful_cori",
     *         "TaskTemplate": {
     *           "ContainerSpec": {
     *             "Image": "redis"
     *           },
     *           "Resources": {
     *             "Limits": {},
     *             "Reservations": {}
     *           },
     *           "RestartPolicy": {
     *             "Condition": "any",
     *             "MaxAttempts": 0
     *           },
     *           "Placement": {},
     *           "ForceUpdate": 0
     *         },
     *         "Mode": {
     *           "Replicated": {
     *             "Replicas": 1
     *           }
     *         },
     *         "UpdateConfig": {
     *           "Parallelism": 1,
     *           "Delay": 1000000000,
     *           "FailureAction": "pause",
     *           "Monitor": 15000000000,
     *           "MaxFailureRatio": 0.15
     *         },
     *         "RollbackConfig": {
     *           "Parallelism": 1,
     *           "Delay": 1000000000,
     *           "FailureAction": "pause",
     *           "Monitor": 15000000000,
     *           "MaxFailureRatio": 0.15
     *         },
     *         "EndpointSpec": {
     *           "Mode": "vip",
     *           "Ports": [
     *             {
     *               "Protocol": "tcp",
     *               "TargetPort": 6379,
     *               "PublishedPort": 30001
     *             }
     *           ]
     *         }
     *       },
     *       "Endpoint": {
     *         "Spec": {
     *           "Mode": "vip",
     *           "Ports": [
     *             {
     *               "Protocol": "tcp",
     *               "TargetPort": 6379,
     *               "PublishedPort": 30001
     *             }
     *           ]
     *         },
     *         "Ports": [
     *           {
     *             "Protocol": "tcp",
     *             "TargetPort": 6379,
     *             "PublishedPort": 30001
     *           }
     *         ],
     *         "VirtualIPs": [
     *           {
     *             "NetworkID": "4qvuz4ko70xaltuqbt8956gd1",
     *             "Addr": "10.255.0.2/16"
     *           },
     *           {
     *             "NetworkID": "4qvuz4ko70xaltuqbt8956gd1",
     *             "Addr": "10.255.0.3/16"
     *           }
     *         ]
     *       }
     *     } */
    Service: {
      ID?: string;
      Version?: components["schemas"]["ObjectVersion"];
      /** Format: dateTime */
      CreatedAt?: string;
      /** Format: dateTime */
      UpdatedAt?: string;
      Spec?: components["schemas"]["ServiceSpec"];
      Endpoint?: {
        Spec?: components["schemas"]["EndpointSpec"];
        Ports?: components["schemas"]["EndpointPortConfig"][];
        VirtualIPs?: {
          NetworkID?: string;
          Addr?: string;
        }[];
      };
      /** @description The status of a service update. */
      UpdateStatus?: {
        /** @enum {string} */
        State?: "updating" | "paused" | "completed";
        /** Format: dateTime */
        StartedAt?: string;
        /** Format: dateTime */
        CompletedAt?: string;
        Message?: string;
      };
      /** @description The status of the service's tasks. Provided only when requested as
       *     part of a ServiceList operation.
       *      */
      ServiceStatus?: {
        /**
         * Format: uint64
         * @description The number of tasks for the service currently in the Running state.
         *
         * @example 7
         */
        RunningTasks?: number;
        /**
         * Format: uint64
         * @description The number of tasks for the service desired to be running.
         *     For replicated services, this is the replica count from the
         *     service spec. For global services, this is computed by taking
         *     count of all tasks for the service with a Desired State other
         *     than Shutdown.
         *
         * @example 10
         */
        DesiredTasks?: number;
        /**
         * Format: uint64
         * @description The number of tasks for a job that are in the Completed state.
         *     This field must be cross-referenced with the service type, as the
         *     value of 0 may mean the service is not in a job mode, or it may
         *     mean the job-mode service has no tasks yet Completed.
         *
         */
        CompletedTasks?: number;
      };
      /** @description The status of the service when it is in one of ReplicatedJob or
       *     GlobalJob modes. Absent on Replicated and Global mode services. The
       *     JobIteration is an ObjectVersion, but unlike the Service's version,
       *     does not need to be sent with an update request.
       *      */
      JobStatus?: {
        JobIteration?: components["schemas"]["ObjectVersion"];
        /**
         * Format: dateTime
         * @description The last time, as observed by the server, that this job was
         *     started.
         *
         */
        LastExecution?: string;
      };
    };
    ImageDeleteResponseItem: {
      /** @description The image ID of an image that was untagged */
      Untagged?: string;
      /** @description The image ID of an image that was deleted */
      Deleted?: string;
    };
    /** @description contains the information returned to a client on the
     *     creation of a new service.
     *      */
    ServiceCreateResponse: {
      /**
       * @description The ID of the created service.
       * @example ak7w3gjqoa3kuz8xcpnyy0pvl
       */
      ID?: string;
      /**
       * @description Optional warning message.
       *
       *     FIXME(thaJeztah): this should have "omitempty" in the generated type.
       *
       * @example [
       *       "unable to pin image doesnotexist:latest to digest: image library/doesnotexist:latest not found"
       *     ]
       */
      Warnings?: string[] | null;
    };
    /** @example {
     *       "Warnings": [
     *         "unable to pin image doesnotexist:latest to digest: image library/doesnotexist:latest not found"
     *       ]
     *     } */
    ServiceUpdateResponse: {
      /** @description Optional warning messages */
      Warnings?: string[];
    };
    /** ContainerInspectResponse */
    ContainerInspectResponse: {
      /**
       * @description The ID of this container as a 128-bit (64-character) hexadecimal string (32 bytes).
       * @example aa86eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf
       */
      Id?: string;
      /**
       * Format: dateTime
       * @description Date and time at which the container was created, formatted in
       *     [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format with nano-seconds.
       * @example 2025-02-17T17:43:39.64001363Z
       */
      Created?: string | null;
      /**
       * @description The path to the command being run
       * @example /bin/sh
       */
      Path?: string;
      /**
       * @description The arguments to the command being run
       * @example [
       *       "-c",
       *       "exit 9"
       *     ]
       */
      Args?: string[];
      State?: components["schemas"]["ContainerState"];
      /**
       * @description The ID (digest) of the image that this container was created from.
       * @example sha256:72297848456d5d37d1262630108ab308d3e9ec7ed1c3286a32fe09856619a782
       */
      Image?: string;
      /**
       * @description Location of the `/etc/resolv.conf` generated for the container on the
       *     host.
       *
       *     This file is managed through the docker daemon, and should not be
       *     accessed or modified by other tools.
       * @example /var/lib/docker/containers/aa86eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf/resolv.conf
       */
      ResolvConfPath?: string;
      /**
       * @description Location of the `/etc/hostname` generated for the container on the
       *     host.
       *
       *     This file is managed through the docker daemon, and should not be
       *     accessed or modified by other tools.
       * @example /var/lib/docker/containers/aa86eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf/hostname
       */
      HostnamePath?: string;
      /**
       * @description Location of the `/etc/hosts` generated for the container on the
       *     host.
       *
       *     This file is managed through the docker daemon, and should not be
       *     accessed or modified by other tools.
       * @example /var/lib/docker/containers/aa86eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf/hosts
       */
      HostsPath?: string;
      /**
       * @description Location of the file used to buffer the container's logs. Depending on
       *     the logging-driver used for the container, this field may be omitted.
       *
       *     This file is managed through the docker daemon, and should not be
       *     accessed or modified by other tools.
       * @example /var/lib/docker/containers/5b7c7e2b992aa426584ce6c47452756066be0e503a08b4516a433a54d2f69e59/5b7c7e2b992aa426584ce6c47452756066be0e503a08b4516a433a54d2f69e59-json.log
       */
      LogPath?: string | null;
      /**
       * @description The name associated with this container.
       *
       *     For historic reasons, the name may be prefixed with a forward-slash (`/`).
       * @example /funny_chatelet
       */
      Name?: string;
      /**
       * @description Number of times the container was restarted since it was created,
       *     or since daemon was started.
       * @example 0
       */
      RestartCount?: number;
      /**
       * @description The storage-driver used for the container's filesystem (graph-driver
       *     or snapshotter).
       * @example overlayfs
       */
      Driver?: string;
      /**
       * @description The platform (operating system) for which the container was created.
       *
       *     This field was introduced for the experimental "LCOW" (Linux Containers
       *     On Windows) features, which has been removed. In most cases, this field
       *     is equal to the host's operating system (`linux` or `windows`).
       * @example linux
       */
      Platform?: string;
      ImageManifestDescriptor?: components["schemas"]["OCIDescriptor"];
      /**
       * @description SELinux mount label set for the container.
       * @example
       */
      MountLabel?: string;
      /**
       * @description SELinux process label set for the container.
       * @example
       */
      ProcessLabel?: string;
      /**
       * @description The AppArmor profile set for the container.
       * @example
       */
      AppArmorProfile?: string;
      /**
       * @description IDs of exec instances that are running in the container.
       * @example [
       *       "b35395de42bc8abd327f9dd65d913b9ba28c74d2f0734eeeae84fa1c616a0fca",
       *       "3fc1232e5cd20c8de182ed81178503dc6437f4e7ef12b52cc5e8de020652f1c4"
       *     ]
       */
      ExecIDs?: string[] | null;
      HostConfig?: components["schemas"]["HostConfig"];
      GraphDriver?: components["schemas"]["DriverData"];
      /**
       * Format: int64
       * @description The size of files that have been created or changed by this container.
       *
       *     This field is omitted by default, and only set when size is requested
       *     in the API request.
       * @example 122880
       */
      SizeRw?: number | null;
      /**
       * Format: int64
       * @description The total size of all files in the read-only layers from the image
       *     that the container uses. These layers can be shared between containers.
       *
       *     This field is omitted by default, and only set when size is requested
       *     in the API request.
       * @example 1653948416
       */
      SizeRootFs?: number | null;
      /** @description List of mounts used by the container. */
      Mounts?: components["schemas"]["MountPoint"][];
      Config?: components["schemas"]["ContainerConfig"];
      NetworkSettings?: components["schemas"]["NetworkSettings"];
    };
    ContainerSummary: {
      /**
       * @description The ID of this container as a 128-bit (64-character) hexadecimal string (32 bytes).
       * @example aa86eacfb3b3ed4cd362c1e88fc89a53908ad05fb3a4103bca3f9b28292d14bf
       */
      Id?: string;
      /**
       * @description The names associated with this container. Most containers have a single
       *     name, but when using legacy "links", the container can have multiple
       *     names.
       *
       *     For historic reasons, names are prefixed with a forward-slash (`/`).
       * @example [
       *       "/funny_chatelet"
       *     ]
       */
      Names?: string[];
      /**
       * @description The name or ID of the image used to create the container.
       *
       *     This field shows the image reference as was specified when creating the container,
       *     which can be in its canonical form (e.g., `docker.io/library/ubuntu:latest`
       *     or `docker.io/library/ubuntu@sha256:72297848456d5d37d1262630108ab308d3e9ec7ed1c3286a32fe09856619a782`),
       *     short form (e.g., `ubuntu:latest`)), or the ID(-prefix) of the image (e.g., `72297848456d`).
       *
       *     The content of this field can be updated at runtime if the image used to
       *     create the container is untagged, in which case the field is updated to
       *     contain the the image ID (digest) it was resolved to in its canonical,
       *     non-truncated form (e.g., `sha256:72297848456d5d37d1262630108ab308d3e9ec7ed1c3286a32fe09856619a782`).
       * @example docker.io/library/ubuntu:latest
       */
      Image?: string;
      /**
       * @description The ID (digest) of the image that this container was created from.
       * @example sha256:72297848456d5d37d1262630108ab308d3e9ec7ed1c3286a32fe09856619a782
       */
      ImageID?: string;
      ImageManifestDescriptor?: components["schemas"]["OCIDescriptor"];
      /**
       * @description Command to run when starting the container
       * @example /bin/bash
       */
      Command?: string;
      /**
       * Format: int64
       * @description Date and time at which the container was created as a Unix timestamp
       *     (number of seconds since EPOCH).
       * @example 1739811096
       */
      Created?: number;
      /** @description Port-mappings for the container. */
      Ports?: components["schemas"]["Port"][];
      /**
       * Format: int64
       * @description The size of files that have been created or changed by this container.
       *
       *     This field is omitted by default, and only set when size is requested
       *     in the API request.
       * @example 122880
       */
      SizeRw?: number | null;
      /**
       * Format: int64
       * @description The total size of all files in the read-only layers from the image
       *     that the container uses. These layers can be shared between containers.
       *
       *     This field is omitted by default, and only set when size is requested
       *     in the API request.
       * @example 1653948416
       */
      SizeRootFs?: number | null;
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.vendor": "Acme",
       *       "com.example.license": "GPL",
       *       "com.example.version": "1.0"
       *     }
       */
      Labels?: {
        [key: string]: string;
      };
      /**
       * @description The state of this container.
       *
       * @example running
       * @enum {string}
       */
      State?:
        | "created"
        | "running"
        | "paused"
        | "restarting"
        | "exited"
        | "removing"
        | "dead";
      /**
       * @description Additional human-readable status of this container (e.g. `Exit 0`)
       * @example Up 4 days
       */
      Status?: string;
      /** @description Summary of host-specific runtime information of the container. This
       *     is a reduced set of information in the container's "HostConfig" as
       *     available in the container "inspect" response. */
      HostConfig?: {
        /**
         * @description Networking mode (`host`, `none`, `container:<id>`) or name of the
         *     primary network the container is using.
         *
         *     This field is primarily for backward compatibility. The container
         *     can be connected to multiple networks for which information can be
         *     found in the `NetworkSettings.Networks` field, which enumerates
         *     settings per network.
         * @example mynetwork
         */
        NetworkMode?: string;
        /**
         * @description Arbitrary key-value metadata attached to the container.
         * @example {
         *       "io.kubernetes.docker.type": "container",
         *       "io.kubernetes.sandbox.id": "3befe639bed0fd6afdd65fd1fa84506756f59360ec4adc270b0fdac9be22b4d3"
         *     }
         */
        Annotations?: {
          [key: string]: string;
        } | null;
      };
      /** @description Summary of the container's network settings */
      NetworkSettings?: {
        /** @description Summary of network-settings for each network the container is
         *     attached to. */
        Networks?: {
          [key: string]: components["schemas"]["EndpointSettings"];
        };
      };
      /** @description List of mounts used by the container. */
      Mounts?: components["schemas"]["MountPoint"][];
    };
    /** @description Driver represents a driver (network, logging, secrets). */
    Driver: {
      /**
       * @description Name of the driver.
       * @example some-driver
       */
      Name: string;
      /**
       * @description Key/value map of driver-specific options.
       * @example {
       *       "OptionA": "value for driver-specific option A",
       *       "OptionB": "value for driver-specific option B"
       *     }
       */
      Options?: {
        [key: string]: string;
      };
    };
    SecretSpec: {
      /** @description User-defined name of the secret. */
      Name?: string;
      /**
       * @description User-defined key/value metadata.
       * @example {
       *       "com.example.some-label": "some-value",
       *       "com.example.some-other-label": "some-other-value"
       *     }
       */
      Labels?: {
        [key: string]: string;
      };
      /**
       * @description Data is the data to store as a secret, formatted as a Base64-url-safe-encoded
       *     ([RFC 4648](https://tools.ietf.org/html/rfc4648#section-5)) string.
       *     It must be empty if the Driver field is set, in which case the data is
       *     loaded from an external secret store. The maximum allowed size is 500KB,
       *     as defined in [MaxSecretSize](https://pkg.go.dev/github.com/moby/swarmkit/v2@v2.0.0-20250103191802-8c1959736554/api/validation#MaxSecretSize).
       *
       *     This field is only used to _create_ a secret, and is not returned by
       *     other endpoints.
       *
       * @example
       */
      Data?: string;
      Driver?: components["schemas"]["Driver"];
      Templating?: components["schemas"]["Driver"];
    };
    Secret: {
      /** @example blt1owaxmitz71s9v5zh81zun */
      ID?: string;
      Version?: components["schemas"]["ObjectVersion"];
      /**
       * Format: dateTime
       * @example 2017-07-20T13:55:28.678958722Z
       */
      CreatedAt?: string;
      /**
       * Format: dateTime
       * @example 2017-07-20T13:55:28.678958722Z
       */
      UpdatedAt?: string;
      Spec?: components["schemas"]["SecretSpec"];
    };
    ConfigSpec: {
      /** @description User-defined name of the config. */
      Name?: string;
      /** @description User-defined key/value metadata. */
      Labels?: {
        [key: string]: string;
      };
      /** @description Data is the data to store as a config, formatted as a Base64-url-safe-encoded
       *     ([RFC 4648](https://tools.ietf.org/html/rfc4648#section-5)) string.
       *     The maximum allowed size is 1000KB, as defined in [MaxConfigSize](https://pkg.go.dev/github.com/moby/swarmkit/v2@v2.0.0-20250103191802-8c1959736554/manager/controlapi#MaxConfigSize).
       *      */
      Data?: string;
      Templating?: components["schemas"]["Driver"];
    };
    Config: {
      ID?: string;
      Version?: components["schemas"]["ObjectVersion"];
      /** Format: dateTime */
      CreatedAt?: string;
      /** Format: dateTime */
      UpdatedAt?: string;
      Spec?: components["schemas"]["ConfigSpec"];
    };
    /** @description ContainerState stores container's running state. It's part of ContainerJSONBase
     *     and will be returned by the "inspect" command.
     *      */
    ContainerState: {
      /**
       * @description String representation of the container state. Can be one of "created",
       *     "running", "paused", "restarting", "removing", "exited", or "dead".
       *
       * @example running
       * @enum {string}
       */
      Status?:
        | "created"
        | "running"
        | "paused"
        | "restarting"
        | "removing"
        | "exited"
        | "dead";
      /**
       * @description Whether this container is running.
       *
       *     Note that a running container can be _paused_. The `Running` and `Paused`
       *     booleans are not mutually exclusive:
       *
       *     When pausing a container (on Linux), the freezer cgroup is used to suspend
       *     all processes in the container. Freezing the process requires the process to
       *     be running. As a result, paused containers are both `Running` _and_ `Paused`.
       *
       *     Use the `Status` field instead to determine if a container's state is "running".
       *
       * @example true
       */
      Running?: boolean;
      /**
       * @description Whether this container is paused.
       * @example false
       */
      Paused?: boolean;
      /**
       * @description Whether this container is restarting.
       * @example false
       */
      Restarting?: boolean;
      /**
       * @description Whether a process within this container has been killed because it ran
       *     out of memory since the container was last started.
       *
       * @example false
       */
      OOMKilled?: boolean;
      /** @example false */
      Dead?: boolean;
      /**
       * @description The process ID of this container
       * @example 1234
       */
      Pid?: number;
      /**
       * @description The last exit code of this container
       * @example 0
       */
      ExitCode?: number;
      Error?: string;
      /**
       * @description The time when this container was last started.
       * @example 2020-01-06T09:06:59.461876391Z
       */
      StartedAt?: string;
      /**
       * @description The time when this container last exited.
       * @example 2020-01-06T09:07:59.461876391Z
       */
      FinishedAt?: string;
      Health?: components["schemas"]["Health"];
    } | null;
    /**
     * ContainerCreateResponse
     * @description OK response to ContainerCreate operation
     */
    ContainerCreateResponse: {
      /**
       * @description The ID of the created container
       * @example ede54ee1afda366ab42f824e8a5ffd195155d853ceaec74a927f249ea270c743
       */
      Id: string;
      /**
       * @description Warnings encountered when creating the container
       * @example []
       */
      Warnings: string[];
    };
    /**
     * ContainerUpdateResponse
     * @description Response for a successful container-update.
     */
    ContainerUpdateResponse: {
      /**
       * @description Warnings encountered when updating the container.
       * @example [
       *       "Published ports are discarded when using host network mode"
       *     ]
       */
      Warnings?: string[];
    };
    /**
     * ContainerStatsResponse
     * @description Statistics sample for a container.
     *
     */
    ContainerStatsResponse: {
      /**
       * @description Name of the container
       * @example boring_wozniak
       */
      name?: string | null;
      /**
       * @description ID of the container
       * @example ede54ee1afda366ab42f824e8a5ffd195155d853ceaec74a927f249ea270c743
       */
      id?: string | null;
      /**
       * Format: date-time
       * @description Date and time at which this sample was collected.
       *     The value is formatted as [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt)
       *     with nano-seconds.
       *
       * @example 2025-01-16T13:55:22.165243637Z
       */
      read?: string;
      /**
       * Format: date-time
       * @description Date and time at which this first sample was collected. This field
       *     is not propagated if the "one-shot" option is set. If the "one-shot"
       *     option is set, this field may be omitted, empty, or set to a default
       *     date (`0001-01-01T00:00:00Z`).
       *
       *     The value is formatted as [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt)
       *     with nano-seconds.
       *
       * @example 2025-01-16T13:55:21.160452595Z
       */
      preread?: string;
      pids_stats?: components["schemas"]["ContainerPidsStats"];
      blkio_stats?: components["schemas"]["ContainerBlkioStats"];
      /**
       * Format: uint32
       * @description The number of processors on the system.
       *
       *     This field is Windows-specific and always zero for Linux containers.
       *
       * @example 16
       */
      num_procs?: number;
      storage_stats?: components["schemas"]["ContainerStorageStats"];
      cpu_stats?: components["schemas"]["ContainerCPUStats"];
      precpu_stats?: components["schemas"]["ContainerCPUStats"];
      memory_stats?: components["schemas"]["ContainerMemoryStats"];
      /**
       * @description Network statistics for the container per interface.
       *
       *     This field is omitted if the container has no networking enabled.
       *
       * @example
       */
      networks?: Record<string, never> | null;
    };
    /**
     * @description BlkioStats stores all IO service stats for data read and write.
     *
     *     This type is Linux-specific and holds many fields that are specific to cgroups v1.
     *     On a cgroup v2 host, all fields other than `io_service_bytes_recursive`
     *     are omitted or `null`.
     *
     *     This type is only populated on Linux and omitted for Windows containers.
     *
     * @example {
     *       "io_service_bytes_recursive": [
     *         {
     *           "major": 254,
     *           "minor": 0,
     *           "op": "read",
     *           "value": 7593984
     *         },
     *         {
     *           "major": 254,
     *           "minor": 0,
     *           "op": "write",
     *           "value": 100
     *         }
     *       ]
     *     }
     */
    ContainerBlkioStats: {
      io_service_bytes_recursive?: components["schemas"]["ContainerBlkioStatEntry"][];
      /** @description This field is only available when using Linux containers with
       *     cgroups v1. It is omitted or `null` when using cgroups v2.
       *      */
      io_serviced_recursive?:
        | components["schemas"]["ContainerBlkioStatEntry"][]
        | null;
      /** @description This field is only available when using Linux containers with
       *     cgroups v1. It is omitted or `null` when using cgroups v2.
       *      */
      io_queue_recursive?:
        | components["schemas"]["ContainerBlkioStatEntry"][]
        | null;
      /** @description This field is only available when using Linux containers with
       *     cgroups v1. It is omitted or `null` when using cgroups v2.
       *      */
      io_service_time_recursive?:
        | components["schemas"]["ContainerBlkioStatEntry"][]
        | null;
      /** @description This field is only available when using Linux containers with
       *     cgroups v1. It is omitted or `null` when using cgroups v2.
       *      */
      io_wait_time_recursive?:
        | components["schemas"]["ContainerBlkioStatEntry"][]
        | null;
      /** @description This field is only available when using Linux containers with
       *     cgroups v1. It is omitted or `null` when using cgroups v2.
       *      */
      io_merged_recursive?:
        | components["schemas"]["ContainerBlkioStatEntry"][]
        | null;
      /** @description This field is only available when using Linux containers with
       *     cgroups v1. It is omitted or `null` when using cgroups v2.
       *      */
      io_time_recursive?:
        | components["schemas"]["ContainerBlkioStatEntry"][]
        | null;
      /** @description This field is only available when using Linux containers with
       *     cgroups v1. It is omitted or `null` when using cgroups v2.
       *      */
      sectors_recursive?:
        | components["schemas"]["ContainerBlkioStatEntry"][]
        | null;
    } | null;
    /** @description Blkio stats entry.
     *
     *     This type is Linux-specific and omitted for Windows containers.
     *      */
    ContainerBlkioStatEntry: {
      /**
       * Format: uint64
       * @example 254
       */
      major?: number;
      /**
       * Format: uint64
       * @example 0
       */
      minor?: number;
      /** @example read */
      op?: string;
      /**
       * Format: uint64
       * @example 7593984
       */
      value?: number;
    } | null;
    /** @description CPU related info of the container
     *      */
    ContainerCPUStats: {
      cpu_usage?: components["schemas"]["ContainerCPUUsage"];
      /**
       * Format: uint64
       * @description System Usage.
       *
       *     This field is Linux-specific and omitted for Windows containers.
       *
       * @example 5
       */
      system_cpu_usage?: number | null;
      /**
       * Format: uint32
       * @description Number of online CPUs.
       *
       *     This field is Linux-specific and omitted for Windows containers.
       *
       * @example 5
       */
      online_cpus?: number | null;
      throttling_data?: components["schemas"]["ContainerThrottlingData"];
    } | null;
    /** @description All CPU stats aggregated since container inception.
     *      */
    ContainerCPUUsage: {
      /**
       * Format: uint64
       * @description Total CPU time consumed in nanoseconds (Linux) or 100's of nanoseconds (Windows).
       *
       * @example 29912000
       */
      total_usage?: number;
      /** @description Total CPU time (in nanoseconds) consumed per core (Linux).
       *
       *     This field is Linux-specific when using cgroups v1. It is omitted
       *     when using cgroups v2 and Windows containers.
       *      */
      percpu_usage?: number[] | null;
      /**
       * Format: uint64
       * @description Time (in nanoseconds) spent by tasks of the cgroup in kernel mode (Linux),
       *     or time spent (in 100's of nanoseconds) by all container processes in
       *     kernel mode (Windows).
       *
       *     Not populated for Windows containers using Hyper-V isolation.
       *
       * @example 21994000
       */
      usage_in_kernelmode?: number;
      /**
       * Format: uint64
       * @description Time (in nanoseconds) spent by tasks of the cgroup in user mode (Linux),
       *     or time spent (in 100's of nanoseconds) by all container processes in
       *     kernel mode (Windows).
       *
       *     Not populated for Windows containers using Hyper-V isolation.
       *
       * @example 7918000
       */
      usage_in_usermode?: number;
    } | null;
    /** @description PidsStats contains Linux-specific stats of a container's process-IDs (PIDs).
     *
     *     This type is Linux-specific and omitted for Windows containers.
     *      */
    ContainerPidsStats: {
      /**
       * Format: uint64
       * @description Current is the number of PIDs in the cgroup.
       *
       * @example 5
       */
      current?: number | null;
      /**
       * Format: uint64
       * @description Limit is the hard limit on the number of pids in the cgroup.
       *     A "Limit" of 0 means that there is no limit.
       *
       */
      limit?: number | null;
    } | null;
    /** @description CPU throttling stats of the container.
     *
     *     This type is Linux-specific and omitted for Windows containers.
     *      */
    ContainerThrottlingData: {
      /**
       * Format: uint64
       * @description Number of periods with throttling active.
       *
       * @example 0
       */
      periods?: number;
      /**
       * Format: uint64
       * @description Number of periods when the container hit its throttling limit.
       *
       * @example 0
       */
      throttled_periods?: number;
      /**
       * Format: uint64
       * @description Aggregated time (in nanoseconds) the container was throttled for.
       *
       * @example 0
       */
      throttled_time?: number;
    } | null;
    /** @description Aggregates all memory stats since container inception on Linux.
     *     Windows returns stats for commit and private working set only.
     *      */
    ContainerMemoryStats: {
      /**
       * Format: uint64
       * @description Current `res_counter` usage for memory.
       *
       *     This field is Linux-specific and omitted for Windows containers.
       *
       * @example 0
       */
      usage?: number | null;
      /**
       * Format: uint64
       * @description Maximum usage ever recorded.
       *
       *     This field is Linux-specific and only supported on cgroups v1.
       *     It is omitted when using cgroups v2 and for Windows containers.
       *
       * @example 0
       */
      max_usage?: number | null;
      /**
       * @description All the stats exported via memory.stat. when using cgroups v2.
       *
       *     This field is Linux-specific and omitted for Windows containers.
       *
       * @example {
       *       "active_anon": 1572864,
       *       "active_file": 5115904,
       *       "anon": 1572864,
       *       "anon_thp": 0,
       *       "file": 7626752,
       *       "file_dirty": 0,
       *       "file_mapped": 2723840,
       *       "file_writeback": 0,
       *       "inactive_anon": 0,
       *       "inactive_file": 2510848,
       *       "kernel_stack": 16384,
       *       "pgactivate": 0,
       *       "pgdeactivate": 0,
       *       "pgfault": 2042,
       *       "pglazyfree": 0,
       *       "pglazyfreed": 0,
       *       "pgmajfault": 45,
       *       "pgrefill": 0,
       *       "pgscan": 0,
       *       "pgsteal": 0,
       *       "shmem": 0,
       *       "slab": 1180928,
       *       "slab_reclaimable": 725576,
       *       "slab_unreclaimable": 455352,
       *       "sock": 0,
       *       "thp_collapse_alloc": 0,
       *       "thp_fault_alloc": 1,
       *       "unevictable": 0,
       *       "workingset_activate": 0,
       *       "workingset_nodereclaim": 0,
       *       "workingset_refault": 0
       *     }
       */
      stats?: {
        [key: string]: number | null;
      };
      /**
       * Format: uint64
       * @description Number of times memory usage hits limits.
       *
       *     This field is Linux-specific and only supported on cgroups v1.
       *     It is omitted when using cgroups v2 and for Windows containers.
       *
       * @example 0
       */
      failcnt?: number | null;
      /**
       * Format: uint64
       * @description This field is Linux-specific and omitted for Windows containers.
       *
       * @example 8217579520
       */
      limit?: number | null;
      /**
       * Format: uint64
       * @description Committed bytes.
       *
       *     This field is Windows-specific and omitted for Linux containers.
       *
       * @example 0
       */
      commitbytes?: number | null;
      /**
       * Format: uint64
       * @description Peak committed bytes.
       *
       *     This field is Windows-specific and omitted for Linux containers.
       *
       * @example 0
       */
      commitpeakbytes?: number | null;
      /**
       * Format: uint64
       * @description Private working set.
       *
       *     This field is Windows-specific and omitted for Linux containers.
       *
       * @example 0
       */
      privateworkingset?: number | null;
    };
    /** @description Aggregates the network stats of one container
     *      */
    ContainerNetworkStats: {
      /**
       * Format: uint64
       * @description Bytes received. Windows and Linux.
       *
       * @example 5338
       */
      rx_bytes?: number;
      /**
       * Format: uint64
       * @description Packets received. Windows and Linux.
       *
       * @example 36
       */
      rx_packets?: number;
      /**
       * Format: uint64
       * @description Received errors. Not used on Windows.
       *
       *     This field is Linux-specific and always zero for Windows containers.
       *
       * @example 0
       */
      rx_errors?: number;
      /**
       * Format: uint64
       * @description Incoming packets dropped. Windows and Linux.
       *
       * @example 0
       */
      rx_dropped?: number;
      /**
       * Format: uint64
       * @description Bytes sent. Windows and Linux.
       *
       * @example 1200
       */
      tx_bytes?: number;
      /**
       * Format: uint64
       * @description Packets sent. Windows and Linux.
       *
       * @example 12
       */
      tx_packets?: number;
      /**
       * Format: uint64
       * @description Sent errors. Not used on Windows.
       *
       *     This field is Linux-specific and always zero for Windows containers.
       *
       * @example 0
       */
      tx_errors?: number;
      /**
       * Format: uint64
       * @description Outgoing packets dropped. Windows and Linux.
       *
       * @example 0
       */
      tx_dropped?: number;
      /** @description Endpoint ID. Not used on Linux.
       *
       *     This field is Windows-specific and omitted for Linux containers.
       *      */
      endpoint_id?: string | null;
      /** @description Instance ID. Not used on Linux.
       *
       *     This field is Windows-specific and omitted for Linux containers.
       *      */
      instance_id?: string | null;
    } | null;
    /** @description StorageStats is the disk I/O stats for read/write on Windows.
     *
     *     This type is Windows-specific and omitted for Linux containers.
     *      */
    ContainerStorageStats: {
      /**
       * Format: uint64
       * @example 7593984
       */
      read_count_normalized?: number | null;
      /**
       * Format: uint64
       * @example 7593984
       */
      read_size_bytes?: number | null;
      /**
       * Format: uint64
       * @example 7593984
       */
      write_count_normalized?: number | null;
      /**
       * Format: uint64
       * @example 7593984
       */
      write_size_bytes?: number | null;
    } | null;
    /**
     * ContainerTopResponse
     * @description Container "top" response.
     */
    ContainerTopResponse: {
      /**
       * @description The ps column titles
       * @example {
       *       "Titles": [
       *         "UID",
       *         "PID",
       *         "PPID",
       *         "C",
       *         "STIME",
       *         "TTY",
       *         "TIME",
       *         "CMD"
       *       ]
       *     }
       */
      Titles?: string[];
      /**
       * @description Each process running in the container, where each process
       *     is an array of values corresponding to the titles.
       * @example {
       *       "Processes": [
       *         [
       *           "root",
       *           "13642",
       *           "882",
       *           "0",
       *           "17:03",
       *           "pts/0",
       *           "00:00:00",
       *           "/bin/bash"
       *         ],
       *         [
       *           "root",
       *           "13735",
       *           "13642",
       *           "0",
       *           "17:06",
       *           "pts/0",
       *           "00:00:00",
       *           "sleep 10"
       *         ]
       *       ]
       *     }
       */
      Processes?: string[][];
    };
    /**
     * ContainerWaitResponse
     * @description OK response to ContainerWait operation
     */
    ContainerWaitResponse: {
      /**
       * Format: int64
       * @description Exit code of the container
       */
      StatusCode: number;
      Error?: components["schemas"]["ContainerWaitExitError"];
    };
    /** @description container waiting error, if any */
    ContainerWaitExitError: {
      /** @description Details of an error */
      Message?: string;
    };
    /** @description Response of Engine API: GET "/version"
     *      */
    SystemVersion: {
      Platform?: {
        Name: string;
      };
      /** @description Information about system components
       *      */
      Components?: {
        /**
         * @description Name of the component
         *
         * @example Engine
         */
        Name: string;
        /**
         * @description Version of the component
         *
         * @example 27.0.1
         */
        Version: string;
        /** @description Key/value pairs of strings with additional information about the
         *     component. These values are intended for informational purposes
         *     only, and their content is not defined, and not part of the API
         *     specification.
         *
         *     These messages can be printed by the client as information to the user.
         *      */
        Details?: Record<string, never> | null;
      }[];
      /**
       * @description The version of the daemon
       * @example 27.0.1
       */
      Version?: string;
      /**
       * @description The default (and highest) API version that is supported by the daemon
       *
       * @example 1.47
       */
      ApiVersion?: string;
      /**
       * @description The minimum API version that is supported by the daemon
       *
       * @example 1.24
       */
      MinAPIVersion?: string;
      /**
       * @description The Git commit of the source code that was used to build the daemon
       *
       * @example 48a66213fe
       */
      GitCommit?: string;
      /**
       * @description The version Go used to compile the daemon, and the version of the Go
       *     runtime in use.
       *
       * @example go1.22.7
       */
      GoVersion?: string;
      /**
       * @description The operating system that the daemon is running on ("linux" or "windows")
       *
       * @example linux
       */
      Os?: string;
      /**
       * @description The architecture that the daemon is running on
       *
       * @example amd64
       */
      Arch?: string;
      /**
       * @description The kernel version (`uname -r`) that the daemon is running on.
       *
       *     This field is omitted when empty.
       *
       * @example 6.8.0-31-generic
       */
      KernelVersion?: string;
      /**
       * @description Indicates if the daemon is started with experimental features enabled.
       *
       *     This field is omitted when empty / false.
       *
       * @example true
       */
      Experimental?: boolean;
      /**
       * @description The date and time that the daemon was compiled.
       *
       * @example 2020-06-22T15:49:27.000000000+00:00
       */
      BuildTime?: string;
    };
    SystemInfo: {
      /**
       * @description Unique identifier of the daemon.
       *
       *     <p><br /></p>
       *
       *     > **Note**: The format of the ID itself is not part of the API, and
       *     > should not be considered stable.
       *
       * @example 7TRN:IPZB:QYBB:VPBQ:UMPP:KARE:6ZNR:XE6T:7EWV:PKF4:ZOJD:TPYS
       */
      ID?: string;
      /**
       * @description Total number of containers on the host.
       * @example 14
       */
      Containers?: number;
      /**
       * @description Number of containers with status `"running"`.
       *
       * @example 3
       */
      ContainersRunning?: number;
      /**
       * @description Number of containers with status `"paused"`.
       *
       * @example 1
       */
      ContainersPaused?: number;
      /**
       * @description Number of containers with status `"stopped"`.
       *
       * @example 10
       */
      ContainersStopped?: number;
      /**
       * @description Total number of images on the host.
       *
       *     Both _tagged_ and _untagged_ (dangling) images are counted.
       *
       * @example 508
       */
      Images?: number;
      /**
       * @description Name of the storage driver in use.
       * @example overlay2
       */
      Driver?: string;
      /**
       * @description Information specific to the storage driver, provided as
       *     "label" / "value" pairs.
       *
       *     This information is provided by the storage driver, and formatted
       *     in a way consistent with the output of `docker info` on the command
       *     line.
       *
       *     <p><br /></p>
       *
       *     > **Note**: The information returned in this field, including the
       *     > formatting of values and labels, should not be considered stable,
       *     > and may change without notice.
       *
       * @example [
       *       [
       *         "Backing Filesystem",
       *         "extfs"
       *       ],
       *       [
       *         "Supports d_type",
       *         "true"
       *       ],
       *       [
       *         "Native Overlay Diff",
       *         "true"
       *       ]
       *     ]
       */
      DriverStatus?: string[][];
      /**
       * @description Root directory of persistent Docker state.
       *
       *     Defaults to `/var/lib/docker` on Linux, and `C:\ProgramData\docker`
       *     on Windows.
       *
       * @example /var/lib/docker
       */
      DockerRootDir?: string;
      Plugins?: components["schemas"]["PluginsInfo"];
      /**
       * @description Indicates if the host has memory limit support enabled.
       * @example true
       */
      MemoryLimit?: boolean;
      /**
       * @description Indicates if the host has memory swap limit support enabled.
       * @example true
       */
      SwapLimit?: boolean;
      /**
       * @description Indicates if the host has kernel memory TCP limit support enabled. This
       *     field is omitted if not supported.
       *
       *     Kernel memory TCP limits are not supported when using cgroups v2, which
       *     does not support the corresponding `memory.kmem.tcp.limit_in_bytes` cgroup.
       *
       * @example true
       */
      KernelMemoryTCP?: boolean;
      /**
       * @description Indicates if CPU CFS(Completely Fair Scheduler) period is supported by
       *     the host.
       *
       * @example true
       */
      CpuCfsPeriod?: boolean;
      /**
       * @description Indicates if CPU CFS(Completely Fair Scheduler) quota is supported by
       *     the host.
       *
       * @example true
       */
      CpuCfsQuota?: boolean;
      /**
       * @description Indicates if CPU Shares limiting is supported by the host.
       *
       * @example true
       */
      CPUShares?: boolean;
      /**
       * @description Indicates if CPUsets (cpuset.cpus, cpuset.mems) are supported by the host.
       *
       *     See [cpuset(7)](https://www.kernel.org/doc/Documentation/cgroup-v1/cpusets.txt)
       *
       * @example true
       */
      CPUSet?: boolean;
      /**
       * @description Indicates if the host kernel has PID limit support enabled.
       * @example true
       */
      PidsLimit?: boolean;
      /** @description Indicates if OOM killer disable is supported on the host. */
      OomKillDisable?: boolean;
      /**
       * @description Indicates IPv4 forwarding is enabled.
       * @example true
       */
      IPv4Forwarding?: boolean;
      /**
       * @description Indicates if `bridge-nf-call-iptables` is available on the host when
       *     the daemon was started.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: netfilter module is now loaded on-demand and no longer
       *     > during daemon startup, making this field obsolete. This field is always
       *     > `false` and will be removed in a API v1.49.
       *
       * @example false
       */
      BridgeNfIptables?: boolean;
      /**
       * @description Indicates if `bridge-nf-call-ip6tables` is available on the host.
       *
       *     <p><br /></p>
       *
       *     > **Deprecated**: netfilter module is now loaded on-demand, and no longer
       *     > during daemon startup, making this field obsolete. This field is always
       *     > `false` and will be removed in a API v1.49.
       *
       * @example false
       */
      BridgeNfIp6tables?: boolean;
      /**
       * @description Indicates if the daemon is running in debug-mode / with debug-level
       *     logging enabled.
       *
       * @example true
       */
      Debug?: boolean;
      /**
       * @description The total number of file Descriptors in use by the daemon process.
       *
       *     This information is only returned if debug-mode is enabled.
       *
       * @example 64
       */
      NFd?: number;
      /**
       * @description The  number of goroutines that currently exist.
       *
       *     This information is only returned if debug-mode is enabled.
       *
       * @example 174
       */
      NGoroutines?: number;
      /**
       * @description Current system-time in [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt)
       *     format with nano-seconds.
       *
       * @example 2017-08-08T20:28:29.06202363Z
       */
      SystemTime?: string;
      /** @description The logging driver to use as a default for new containers.
       *      */
      LoggingDriver?: string;
      /**
       * @description The driver to use for managing cgroups.
       *
       * @default cgroupfs
       * @example cgroupfs
       * @enum {string}
       */
      CgroupDriver: "cgroupfs" | "systemd" | "none";
      /**
       * @description The version of the cgroup.
       *
       * @default 1
       * @example 1
       * @enum {string}
       */
      CgroupVersion: "1" | "2";
      /**
       * @description Number of event listeners subscribed.
       * @example 30
       */
      NEventsListener?: number;
      /**
       * @description Kernel version of the host.
       *
       *     On Linux, this information obtained from `uname`. On Windows this
       *     information is queried from the <kbd>HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\</kbd>
       *     registry value, for example _"10.0 14393 (14393.1198.amd64fre.rs1_release_sec.170427-1353)"_.
       *
       * @example 6.8.0-31-generic
       */
      KernelVersion?: string;
      /**
       * @description Name of the host's operating system, for example: "Ubuntu 24.04 LTS"
       *     or "Windows Server 2016 Datacenter"
       *
       * @example Ubuntu 24.04 LTS
       */
      OperatingSystem?: string;
      /**
       * @description Version of the host's operating system
       *
       *     <p><br /></p>
       *
       *     > **Note**: The information returned in this field, including its
       *     > very existence, and the formatting of values, should not be considered
       *     > stable, and may change without notice.
       *
       * @example 24.04
       */
      OSVersion?: string;
      /**
       * @description Generic type of the operating system of the host, as returned by the
       *     Go runtime (`GOOS`).
       *
       *     Currently returned values are "linux" and "windows". A full list of
       *     possible values can be found in the [Go documentation](https://go.dev/doc/install/source#environment).
       *
       * @example linux
       */
      OSType?: string;
      /**
       * @description Hardware architecture of the host, as returned by the Go runtime
       *     (`GOARCH`).
       *
       *     A full list of possible values can be found in the [Go documentation](https://go.dev/doc/install/source#environment).
       *
       * @example x86_64
       */
      Architecture?: string;
      /**
       * @description The number of logical CPUs usable by the daemon.
       *
       *     The number of available CPUs is checked by querying the operating
       *     system when the daemon starts. Changes to operating system CPU
       *     allocation after the daemon is started are not reflected.
       *
       * @example 4
       */
      NCPU?: number;
      /**
       * Format: int64
       * @description Total amount of physical memory available on the host, in bytes.
       *
       * @example 2095882240
       */
      MemTotal?: number;
      /**
       * @description Address / URL of the index server that is used for image search,
       *     and as a default for user authentication for Docker Hub and Docker Cloud.
       *
       * @default https://index.docker.io/v1/
       * @example https://index.docker.io/v1/
       */
      IndexServerAddress: string;
      RegistryConfig?: components["schemas"]["RegistryServiceConfig"];
      GenericResources?: components["schemas"]["GenericResources"];
      /**
       * @description HTTP-proxy configured for the daemon. This value is obtained from the
       *     [`HTTP_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html) environment variable.
       *     Credentials ([user info component](https://tools.ietf.org/html/rfc3986#section-3.2.1)) in the proxy URL
       *     are masked in the API response.
       *
       *     Containers do not automatically inherit this configuration.
       *
       * @example http://xxxxx:xxxxx@proxy.corp.example.com:8080
       */
      HttpProxy?: string;
      /**
       * @description HTTPS-proxy configured for the daemon. This value is obtained from the
       *     [`HTTPS_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html) environment variable.
       *     Credentials ([user info component](https://tools.ietf.org/html/rfc3986#section-3.2.1)) in the proxy URL
       *     are masked in the API response.
       *
       *     Containers do not automatically inherit this configuration.
       *
       * @example https://xxxxx:xxxxx@proxy.corp.example.com:4443
       */
      HttpsProxy?: string;
      /**
       * @description Comma-separated list of domain extensions for which no proxy should be
       *     used. This value is obtained from the [`NO_PROXY`](https://www.gnu.org/software/wget/manual/html_node/Proxies.html)
       *     environment variable.
       *
       *     Containers do not automatically inherit this configuration.
       *
       * @example *.local, 169.254/16
       */
      NoProxy?: string;
      /**
       * @description Hostname of the host.
       * @example node5.corp.example.com
       */
      Name?: string;
      /**
       * @description User-defined labels (key/value metadata) as set on the daemon.
       *
       *     <p><br /></p>
       *
       *     > **Note**: When part of a Swarm, nodes can both have _daemon_ labels,
       *     > set through the daemon configuration, and _node_ labels, set from a
       *     > manager node in the Swarm. Node labels are not included in this
       *     > field. Node labels can be retrieved using the `/nodes/(id)` endpoint
       *     > on a manager node in the Swarm.
       *
       * @example [
       *       "storage=ssd",
       *       "production"
       *     ]
       */
      Labels?: string[];
      /**
       * @description Indicates if experimental features are enabled on the daemon.
       *
       * @example true
       */
      ExperimentalBuild?: boolean;
      /**
       * @description Version string of the daemon.
       *
       * @example 27.0.1
       */
      ServerVersion?: string;
      /**
       * @description List of [OCI compliant](https://github.com/opencontainers/runtime-spec)
       *     runtimes configured on the daemon. Keys hold the "name" used to
       *     reference the runtime.
       *
       *     The Docker daemon relies on an OCI compliant runtime (invoked via the
       *     `containerd` daemon) as its interface to the Linux kernel namespaces,
       *     cgroups, and SELinux.
       *
       *     The default runtime is `runc`, and automatically configured. Additional
       *     runtimes can be configured by the user and will be listed here.
       *
       * @example {
       *       "runc": {
       *         "path": "runc"
       *       },
       *       "runc-master": {
       *         "path": "/go/bin/runc"
       *       },
       *       "custom": {
       *         "path": "/usr/local/bin/my-oci-runtime",
       *         "runtimeArgs": [
       *           "--debug",
       *           "--systemd-cgroup=false"
       *         ]
       *       }
       *     }
       */
      Runtimes?: {
        [key: string]: components["schemas"]["Runtime"];
      };
      /**
       * @description Name of the default OCI runtime that is used when starting containers.
       *
       *     The default can be overridden per-container at create time.
       *
       * @default runc
       * @example runc
       */
      DefaultRuntime: string;
      Swarm?: components["schemas"]["SwarmInfo"];
      /**
       * @description Indicates if live restore is enabled.
       *
       *     If enabled, containers are kept running when the daemon is shutdown
       *     or upon daemon start if running containers are detected.
       *
       * @default false
       * @example false
       */
      LiveRestoreEnabled: boolean;
      /**
       * @description Represents the isolation technology to use as a default for containers.
       *     The supported values are platform-specific.
       *
       *     If no isolation value is specified on daemon start, on Windows client,
       *     the default is `hyperv`, and on Windows server, the default is `process`.
       *
       *     This option is currently not used on other platforms.
       *
       * @default default
       * @enum {string}
       */
      Isolation: "default" | "hyperv" | "process" | "";
      /**
       * @description Name and, optional, path of the `docker-init` binary.
       *
       *     If the path is omitted, the daemon searches the host's `$PATH` for the
       *     binary and uses the first result.
       *
       * @example docker-init
       */
      InitBinary?: string;
      ContainerdCommit?: components["schemas"]["Commit"];
      RuncCommit?: components["schemas"]["Commit"];
      InitCommit?: components["schemas"]["Commit"];
      /**
       * @description List of security features that are enabled on the daemon, such as
       *     apparmor, seccomp, SELinux, user-namespaces (userns), rootless and
       *     no-new-privileges.
       *
       *     Additional configuration options for each security feature may
       *     be present, and are included as a comma-separated list of key/value
       *     pairs.
       *
       * @example [
       *       "name=apparmor",
       *       "name=seccomp,profile=default",
       *       "name=selinux",
       *       "name=userns",
       *       "name=rootless"
       *     ]
       */
      SecurityOptions?: string[];
      /**
       * @description Reports a summary of the product license on the daemon.
       *
       *     If a commercial license has been applied to the daemon, information
       *     such as number of nodes, and expiration are included.
       *
       * @example Community Engine
       */
      ProductLicense?: string;
      /** @description List of custom default address pools for local networks, which can be
       *     specified in the daemon.json file or dockerd option.
       *
       *     Example: a Base "10.10.0.0/16" with Size 24 will define the set of 256
       *     10.10.[0-255].0/24 address pools.
       *      */
      DefaultAddressPools?: {
        /**
         * @description The network address in CIDR format
         * @example 10.10.0.0/16
         */
        Base?: string;
        /**
         * @description The network pool size
         * @example 24
         */
        Size?: number;
      }[];
      FirewallBackend?: components["schemas"]["FirewallInfo"];
      /** @description List of devices discovered by device drivers.
       *
       *     Each device includes information about its source driver, kind, name,
       *     and additional driver-specific attributes.
       *      */
      DiscoveredDevices?: components["schemas"]["DeviceInfo"][];
      /**
       * @description List of warnings / informational messages about missing features, or
       *     issues related to the daemon configuration.
       *
       *     These messages can be printed by the client as information to the user.
       *
       * @example [
       *       "WARNING: No memory limit support"
       *     ]
       */
      Warnings?: string[];
      /**
       * @description List of directories where (Container Device Interface) CDI
       *     specifications are located.
       *
       *     These specifications define vendor-specific modifications to an OCI
       *     runtime specification for a container being created.
       *
       *     An empty list indicates that CDI device injection is disabled.
       *
       *     Note that since using CDI device injection requires the daemon to have
       *     experimental enabled. For non-experimental daemons an empty list will
       *     always be returned.
       *
       * @example [
       *       "/etc/cdi",
       *       "/var/run/cdi"
       *     ]
       */
      CDISpecDirs?: string[];
      Containerd?: components["schemas"]["ContainerdInfo"];
    };
    /** @description Information for connecting to the containerd instance that is used by the daemon.
     *     This is included for debugging purposes only.
     *      */
    ContainerdInfo: {
      /**
       * @description The address of the containerd socket.
       * @example /run/containerd/containerd.sock
       */
      Address?: string;
      /** @description The namespaces that the daemon uses for running containers and
       *     plugins in containerd. These namespaces can be configured in the
       *     daemon configuration, and are considered to be used exclusively
       *     by the daemon, Tampering with the containerd instance may cause
       *     unexpected behavior.
       *
       *     As these namespaces are considered to be exclusively accessed
       *     by the daemon, it is not recommended to change these values,
       *     or to change them to a value that is used by other systems,
       *     such as cri-containerd.
       *      */
      Namespaces?: {
        /**
         * @description The default containerd namespace used for containers managed
         *     by the daemon.
         *
         *     The default namespace for containers is "moby", but will be
         *     suffixed with the `<uid>.<gid>` of the remapped `root` if
         *     user-namespaces are enabled and the containerd image-store
         *     is used.
         *
         * @default moby
         * @example moby
         */
        Containers: string;
        /**
         * @description The default containerd namespace used for plugins managed by
         *     the daemon.
         *
         *     The default namespace for plugins is "plugins.moby", but will be
         *     suffixed with the `<uid>.<gid>` of the remapped `root` if
         *     user-namespaces are enabled and the containerd image-store
         *     is used.
         *
         * @default plugins.moby
         * @example plugins.moby
         */
        Plugins: string;
      };
    } | null;
    /** @description Information about the daemon's firewalling configuration.
     *
     *     This field is currently only used on Linux, and omitted on other platforms.
     *      */
    FirewallInfo: {
      /**
       * @description The name of the firewall backend driver.
       *
       * @example nftables
       */
      Driver?: string;
      /**
       * @description Information about the firewall backend, provided as
       *     "label" / "value" pairs.
       *
       *     <p><br /></p>
       *
       *     > **Note**: The information returned in this field, including the
       *     > formatting of values and labels, should not be considered stable,
       *     > and may change without notice.
       *
       * @example [
       *       [
       *         "ReloadedAt",
       *         "2025-01-01T00:00:00Z"
       *       ]
       *     ]
       */
      Info?: string[][];
    } | null;
    /** @description Available plugins per type.
     *
     *     <p><br /></p>
     *
     *     > **Note**: Only unmanaged (V1) plugins are included in this list.
     *     > V1 plugins are "lazily" loaded, and are not returned in this list
     *     > if there is no resource using the plugin.
     *      */
    PluginsInfo: {
      /**
       * @description Names of available volume-drivers, and network-driver plugins.
       * @example [
       *       "local"
       *     ]
       */
      Volume?: string[];
      /**
       * @description Names of available network-drivers, and network-driver plugins.
       * @example [
       *       "bridge",
       *       "host",
       *       "ipvlan",
       *       "macvlan",
       *       "null",
       *       "overlay"
       *     ]
       */
      Network?: string[];
      /**
       * @description Names of available authorization plugins.
       * @example [
       *       "img-authz-plugin",
       *       "hbm"
       *     ]
       */
      Authorization?: string[];
      /**
       * @description Names of available logging-drivers, and logging-driver plugins.
       * @example [
       *       "awslogs",
       *       "fluentd",
       *       "gcplogs",
       *       "gelf",
       *       "journald",
       *       "json-file",
       *       "splunk",
       *       "syslog"
       *     ]
       */
      Log?: string[];
    };
    /** @description RegistryServiceConfig stores daemon registry services configuration.
     *      */
    RegistryServiceConfig: {
      /**
       * @description List of IP ranges of insecure registries, using the CIDR syntax
       *     ([RFC 4632](https://tools.ietf.org/html/4632)). Insecure registries
       *     accept un-encrypted (HTTP) and/or untrusted (HTTPS with certificates
       *     from unknown CAs) communication.
       *
       *     By default, local registries (`::1/128` and `127.0.0.0/8`) are configured as
       *     insecure. All other registries are secure. Communicating with an
       *     insecure registry is not possible if the daemon assumes that registry
       *     is secure.
       *
       *     This configuration override this behavior, insecure communication with
       *     registries whose resolved IP address is within the subnet described by
       *     the CIDR syntax.
       *
       *     Registries can also be marked insecure by hostname. Those registries
       *     are listed under `IndexConfigs` and have their `Secure` field set to
       *     `false`.
       *
       *     > **Warning**: Using this option can be useful when running a local
       *     > registry, but introduces security vulnerabilities. This option
       *     > should therefore ONLY be used for testing purposes. For increased
       *     > security, users should add their CA to their system's list of trusted
       *     > CAs instead of enabling this option.
       *
       * @example [
       *       "::1/128",
       *       "127.0.0.0/8"
       *     ]
       */
      InsecureRegistryCIDRs?: string[];
      /** @example {
       *       "127.0.0.1:5000": {
       *         "Name": "127.0.0.1:5000",
       *         "Mirrors": [],
       *         "Secure": false,
       *         "Official": false
       *       },
       *       "[2001:db8:a0b:12f0::1]:80": {
       *         "Name": "[2001:db8:a0b:12f0::1]:80",
       *         "Mirrors": [],
       *         "Secure": false,
       *         "Official": false
       *       },
       *       "docker.io": {
       *         "Name": "docker.io",
       *         "Mirrors": [
       *           "https://hub-mirror.corp.example.com:5000/"
       *         ],
       *         "Secure": true,
       *         "Official": true
       *       },
       *       "registry.internal.corp.example.com:3000": {
       *         "Name": "registry.internal.corp.example.com:3000",
       *         "Mirrors": [],
       *         "Secure": false,
       *         "Official": false
       *       }
       *     } */
      IndexConfigs?: {
        [key: string]: components["schemas"]["IndexInfo"];
      };
      /**
       * @description List of registry URLs that act as a mirror for the official
       *     (`docker.io`) registry.
       *
       * @example [
       *       "https://hub-mirror.corp.example.com:5000/",
       *       "https://[2001:db8:a0b:12f0::1]/"
       *     ]
       */
      Mirrors?: string[];
    } | null;
    /** @description IndexInfo contains information about a registry. */
    IndexInfo: {
      /**
       * @description Name of the registry, such as "docker.io".
       *
       * @example docker.io
       */
      Name?: string;
      /**
       * @description List of mirrors, expressed as URIs.
       *
       * @example [
       *       "https://hub-mirror.corp.example.com:5000/",
       *       "https://registry-2.docker.io/",
       *       "https://registry-3.docker.io/"
       *     ]
       */
      Mirrors?: string[];
      /**
       * @description Indicates if the registry is part of the list of insecure
       *     registries.
       *
       *     If `false`, the registry is insecure. Insecure registries accept
       *     un-encrypted (HTTP) and/or untrusted (HTTPS with certificates from
       *     unknown CAs) communication.
       *
       *     > **Warning**: Insecure registries can be useful when running a local
       *     > registry. However, because its use creates security vulnerabilities
       *     > it should ONLY be enabled for testing purposes. For increased
       *     > security, users should add their CA to their system's list of
       *     > trusted CAs instead of enabling this option.
       *
       * @example true
       */
      Secure?: boolean;
      /**
       * @description Indicates whether this is an official registry (i.e., Docker Hub / docker.io)
       *
       * @example true
       */
      Official?: boolean;
    } | null;
    /** @description Runtime describes an [OCI compliant](https://github.com/opencontainers/runtime-spec)
     *     runtime.
     *
     *     The runtime is invoked by the daemon via the `containerd` daemon. OCI
     *     runtimes act as an interface to the Linux kernel namespaces, cgroups,
     *     and SELinux.
     *      */
    Runtime: {
      /**
       * @description Name and, optional, path, of the OCI executable binary.
       *
       *     If the path is omitted, the daemon searches the host's `$PATH` for the
       *     binary and uses the first result.
       *
       * @example /usr/local/bin/my-oci-runtime
       */
      path?: string;
      /**
       * @description List of command-line arguments to pass to the runtime when invoked.
       *
       * @example [
       *       "--debug",
       *       "--systemd-cgroup=false"
       *     ]
       */
      runtimeArgs?: string[] | null;
      /**
       * @description Information specific to the runtime.
       *
       *     While this API specification does not define data provided by runtimes,
       *     the following well-known properties may be provided by runtimes:
       *
       *     `org.opencontainers.runtime-spec.features`: features structure as defined
       *     in the [OCI Runtime Specification](https://github.com/opencontainers/runtime-spec/blob/main/features.md),
       *     in a JSON string representation.
       *
       *     <p><br /></p>
       *
       *     > **Note**: The information returned in this field, including the
       *     > formatting of values and labels, should not be considered stable,
       *     > and may change without notice.
       *
       * @example {
       *       "org.opencontainers.runtime-spec.features": "{\"ociVersionMin\":\"1.0.0\",\"ociVersionMax\":\"1.1.0\",\"...\":\"...\"}"
       *     }
       */
      status?: {
        [key: string]: string;
      } | null;
    };
    /** @description Commit holds the Git-commit (SHA1) that a binary was built from, as
     *     reported in the version-string of external tools, such as `containerd`,
     *     or `runC`.
     *      */
    Commit: {
      /**
       * @description Actual commit ID of external tool.
       * @example cfb82a876ecc11b5ca0977d1733adbe58599088a
       */
      ID?: string;
    };
    /** @description Represents generic information about swarm.
     *      */
    SwarmInfo: {
      /**
       * @description Unique identifier of for this node in the swarm.
       * @default
       * @example k67qz4598weg5unwwffg6z1m1
       */
      NodeID: string;
      /**
       * @description IP address at which this node can be reached by other nodes in the
       *     swarm.
       *
       * @default
       * @example 10.0.0.46
       */
      NodeAddr: string;
      LocalNodeState?: components["schemas"]["LocalNodeState"];
      /**
       * @default false
       * @example true
       */
      ControlAvailable: boolean;
      /** @default  */
      Error: string;
      /**
       * @description List of ID's and addresses of other managers in the swarm.
       *
       * @example [
       *       {
       *         "NodeID": "71izy0goik036k48jg985xnds",
       *         "Addr": "10.0.0.158:2377"
       *       },
       *       {
       *         "NodeID": "79y6h1o4gv8n120drcprv5nmc",
       *         "Addr": "10.0.0.159:2377"
       *       },
       *       {
       *         "NodeID": "k67qz4598weg5unwwffg6z1m1",
       *         "Addr": "10.0.0.46:2377"
       *       }
       *     ]
       */
      RemoteManagers?: components["schemas"]["PeerNode"][] | null;
      /**
       * @description Total number of nodes in the swarm.
       * @example 4
       */
      Nodes?: number | null;
      /**
       * @description Total number of managers in the swarm.
       * @example 3
       */
      Managers?: number | null;
      Cluster?: components["schemas"]["ClusterInfo"];
    };
    /**
     * @description Current local status of this node.
     * @default
     * @example active
     * @enum {string}
     */
    LocalNodeState: "" | "inactive" | "pending" | "active" | "error" | "locked";
    /** @description Represents a peer-node in the swarm */
    PeerNode: {
      /** @description Unique identifier of for this node in the swarm. */
      NodeID?: string;
      /** @description IP address and ports at which this node can be reached.
       *      */
      Addr?: string;
    };
    /** @description Specifies how a service should be attached to a particular network.
     *      */
    NetworkAttachmentConfig: {
      /** @description The target network for attachment. Must be a network name or ID.
       *      */
      Target?: string;
      /** @description Discoverable alternate names for the service on this network.
       *      */
      Aliases?: string[];
      /** @description Driver attachment options for the network target.
       *      */
      DriverOpts?: {
        [key: string]: string;
      };
    };
    /** @description Actor describes something that generates events, like a container, network,
     *     or a volume.
     *      */
    EventActor: {
      /**
       * @description The ID of the object emitting the event
       * @example ede54ee1afda366ab42f824e8a5ffd195155d853ceaec74a927f249ea270c743
       */
      ID?: string;
      /**
       * @description Various key/value attributes of the object, depending on its type.
       *
       * @example {
       *       "com.example.some-label": "some-label-value",
       *       "image": "alpine:latest",
       *       "name": "my-container"
       *     }
       */
      Attributes?: {
        [key: string]: string;
      };
    };
    /**
     * SystemEventsResponse
     * @description EventMessage represents the information an event contains.
     *
     */
    EventMessage: {
      /**
       * @description The type of object emitting the event
       * @example container
       * @enum {string}
       */
      Type?:
        | "builder"
        | "config"
        | "container"
        | "daemon"
        | "image"
        | "network"
        | "node"
        | "plugin"
        | "secret"
        | "service"
        | "volume";
      /**
       * @description The type of event
       * @example create
       */
      Action?: string;
      Actor?: components["schemas"]["EventActor"];
      /**
       * @description Scope of the event. Engine events are `local` scope. Cluster (Swarm)
       *     events are `swarm` scope.
       *
       * @enum {string}
       */
      scope?: "local" | "swarm";
      /**
       * Format: int64
       * @description Timestamp of event
       * @example 1629574695
       */
      time?: number;
      /**
       * Format: int64
       * @description Timestamp of event, with nanosecond accuracy
       * @example 1629574695515050000
       */
      timeNano?: number;
    };
    /** @description A descriptor struct containing digest, media type, and size, as defined in
     *     the [OCI Content Descriptors Specification](https://github.com/opencontainers/image-spec/blob/v1.0.1/descriptor.md).
     *      */
    OCIDescriptor: {
      /**
       * @description The media type of the object this schema refers to.
       *
       * @example application/vnd.oci.image.manifest.v1+json
       */
      mediaType?: string;
      /**
       * @description The digest of the targeted content.
       *
       * @example sha256:c0537ff6a5218ef531ece93d4984efc99bbf3f7497c0a7726c88e2bb7584dc96
       */
      digest?: string;
      /**
       * Format: int64
       * @description The size in bytes of the blob.
       *
       * @example 424
       */
      size?: number;
      /** @description List of URLs from which this object MAY be downloaded. */
      urls?: string[] | null;
      /**
       * @description Arbitrary metadata relating to the targeted content.
       * @example {
       *       "com.docker.official-images.bashbrew.arch": "amd64",
       *       "org.opencontainers.image.base.digest": "sha256:0d0ef5c914d3ea700147da1bd050c59edb8bb12ca312f3800b29d7c8087eabd8",
       *       "org.opencontainers.image.base.name": "scratch",
       *       "org.opencontainers.image.created": "2025-01-27T00:00:00Z",
       *       "org.opencontainers.image.revision": "9fabb4bad5138435b01857e2fe9363e2dc5f6a79",
       *       "org.opencontainers.image.source": "https://git.launchpad.net/cloud-images/+oci/ubuntu-base",
       *       "org.opencontainers.image.url": "https://hub.docker.com/_/ubuntu",
       *       "org.opencontainers.image.version": "24.04"
       *     }
       */
      annotations?: {
        [key: string]: string;
      } | null;
      /** @description Data is an embedding of the targeted content. This is encoded as a base64
       *     string when marshalled to JSON (automatically, by encoding/json). If
       *     present, Data can be used directly to avoid fetching the targeted content. */
      data?: string | null;
      platform?: components["schemas"]["OCIPlatform"];
      /** @description ArtifactType is the IANA media type of this artifact. */
      artifactType?: string | null;
    };
    /** @description Describes the platform which the image in the manifest runs on, as defined
     *     in the [OCI Image Index Specification](https://github.com/opencontainers/image-spec/blob/v1.0.1/image-index.md).
     *      */
    OCIPlatform: {
      /**
       * @description The CPU architecture, for example `amd64` or `ppc64`.
       *
       * @example arm
       */
      architecture?: string;
      /**
       * @description The operating system, for example `linux` or `windows`.
       *
       * @example windows
       */
      os?: string;
      /**
       * @description Optional field specifying the operating system version, for example on
       *     Windows `10.0.19041.1165`.
       *
       * @example 10.0.19041.1165
       */
      "os.version"?: string;
      /**
       * @description Optional field specifying an array of strings, each listing a required
       *     OS feature (for example on Windows `win32k`).
       *
       * @example [
       *       "win32k"
       *     ]
       */
      "os.features"?: string[];
      /**
       * @description Optional field specifying a variant of the CPU, for example `v7` to
       *     specify ARMv7 when architecture is `arm`.
       *
       * @example v7
       */
      variant?: string;
    } | null;
    /**
     * DistributionInspectResponse
     * @description Describes the result obtained from contacting the registry to retrieve
     *     image metadata.
     *
     */
    DistributionInspect: {
      Descriptor: components["schemas"]["OCIDescriptor"];
      /** @description An array containing all platforms supported by the image.
       *      */
      Platforms: components["schemas"]["OCIPlatform"][];
    };
    /** @description Options and information specific to, and only present on, Swarm CSI
     *     cluster volumes.
     *      */
    ClusterVolume: {
      /** @description The Swarm ID of this volume. Because cluster volumes are Swarm
       *     objects, they have an ID, unlike non-cluster volumes. This ID can
       *     be used to refer to the Volume instead of the name.
       *      */
      ID?: string;
      Version?: components["schemas"]["ObjectVersion"];
      /** Format: dateTime */
      CreatedAt?: string;
      /** Format: dateTime */
      UpdatedAt?: string;
      Spec?: components["schemas"]["ClusterVolumeSpec"];
      /** @description Information about the global status of the volume.
       *      */
      Info?: {
        /**
         * Format: int64
         * @description The capacity of the volume in bytes. A value of 0 indicates that
         *     the capacity is unknown.
         *
         */
        CapacityBytes?: number;
        /** @description A map of strings to strings returned from the storage plugin when
         *     the volume is created.
         *      */
        VolumeContext?: {
          [key: string]: string;
        };
        /** @description The ID of the volume as returned by the CSI storage plugin. This
         *     is distinct from the volume's ID as provided by Docker. This ID
         *     is never used by the user when communicating with Docker to refer
         *     to this volume. If the ID is blank, then the Volume has not been
         *     successfully created in the plugin yet.
         *      */
        VolumeID?: string;
        /** @description The topology this volume is actually accessible from.
         *      */
        AccessibleTopology?: components["schemas"]["Topology"][];
      };
      /** @description The status of the volume as it pertains to its publishing and use on
       *     specific nodes
       *      */
      PublishStatus?: {
        /** @description The ID of the Swarm node the volume is published on.
         *      */
        NodeID?: string;
        /**
         * @description The published state of the volume.
         *     * `pending-publish` The volume should be published to this node, but the call to the controller plugin to do so has not yet been successfully completed.
         *     * `published` The volume is published successfully to the node.
         *     * `pending-node-unpublish` The volume should be unpublished from the node, and the manager is awaiting confirmation from the worker that it has done so.
         *     * `pending-controller-unpublish` The volume is successfully unpublished from the node, but has not yet been successfully unpublished on the controller.
         *
         * @enum {string}
         */
        State?:
          | "pending-publish"
          | "published"
          | "pending-node-unpublish"
          | "pending-controller-unpublish";
        /** @description A map of strings to strings returned by the CSI controller
         *     plugin when a volume is published.
         *      */
        PublishContext?: {
          [key: string]: string;
        };
      }[];
    };
    /** @description Cluster-specific options used to create the volume.
     *      */
    ClusterVolumeSpec: {
      /** @description Group defines the volume group of this volume. Volumes belonging to
       *     the same group can be referred to by group name when creating
       *     Services.  Referring to a volume by group instructs Swarm to treat
       *     volumes in that group interchangeably for the purpose of scheduling.
       *     Volumes with an empty string for a group technically all belong to
       *     the same, emptystring group.
       *      */
      Group?: string;
      /** @description Defines how the volume is used by tasks.
       *      */
      AccessMode?: {
        /**
         * @description The set of nodes this volume can be used on at one time.
         *     - `single` The volume may only be scheduled to one node at a time.
         *     - `multi` the volume may be scheduled to any supported number of nodes at a time.
         *
         * @default single
         * @enum {string}
         */
        Scope: "single" | "multi";
        /**
         * @description The number and way that different tasks can use this volume
         *     at one time.
         *     - `none` The volume may only be used by one task at a time.
         *     - `readonly` The volume may be used by any number of tasks, but they all must mount the volume as readonly
         *     - `onewriter` The volume may be used by any number of tasks, but only one may mount it as read/write.
         *     - `all` The volume may have any number of readers and writers.
         *
         * @default none
         * @enum {string}
         */
        Sharing: "none" | "readonly" | "onewriter" | "all";
        /** @description Options for using this volume as a Mount-type volume.
         *
         *         Either MountVolume or BlockVolume, but not both, must be
         *         present.
         *       properties:
         *         FsType:
         *           type: "string"
         *           description: |
         *             Specifies the filesystem type for the mount volume.
         *             Optional.
         *         MountFlags:
         *           type: "array"
         *           description: |
         *             Flags to pass when mounting the volume. Optional.
         *           items:
         *             type: "string"
         *     BlockVolume:
         *       type: "object"
         *       description: |
         *         Options for using this volume as a Block-type volume.
         *         Intentionally empty.
         *      */
        MountVolume?: Record<string, never>;
        /** @description Swarm Secrets that are passed to the CSI storage plugin when
         *     operating on this volume.
         *      */
        Secrets?: {
          /** @description Key is the name of the key of the key-value pair passed to
           *     the plugin.
           *      */
          Key?: string;
          /** @description Secret is the swarm Secret object from which to read data.
           *     This can be a Secret name or ID. The Secret data is
           *     retrieved by swarm and used as the value of the key-value
           *     pair passed to the plugin.
           *      */
          Secret?: string;
        }[];
        /** @description Requirements for the accessible topology of the volume. These
         *     fields are optional. For an in-depth description of what these
         *     fields mean, see the CSI specification.
         *      */
        AccessibilityRequirements?: {
          /** @description A list of required topologies, at least one of which the
           *     volume must be accessible from.
           *      */
          Requisite?: components["schemas"]["Topology"][];
          /** @description A list of topologies that the volume should attempt to be
           *     provisioned in.
           *      */
          Preferred?: components["schemas"]["Topology"][];
        };
        /** @description The desired capacity that the volume should be created with. If
         *     empty, the plugin will decide the capacity.
         *      */
        CapacityRange?: {
          /**
           * Format: int64
           * @description The volume must be at least this big. The value of 0
           *     indicates an unspecified minimum
           *
           */
          RequiredBytes?: number;
          /**
           * Format: int64
           * @description The volume must not be bigger than this. The value of 0
           *     indicates an unspecified maximum.
           *
           */
          LimitBytes?: number;
        };
        /**
         * @description The availability of the volume for use in tasks.
         *     - `active` The volume is fully available for scheduling on the cluster
         *     - `pause` No new workloads should use the volume, but existing workloads are not stopped.
         *     - `drain` All workloads using this volume should be stopped and rescheduled, and no new ones should be started.
         *
         * @default active
         * @enum {string}
         */
        Availability: "active" | "pause" | "drain";
      };
    };
    /** @description A map of topological domains to topological segments. For in depth
     *     details, see documentation for the Topology object in the CSI
     *     specification.
     *      */
    Topology: {
      [key: string]: string;
    };
    /** @description ImageManifestSummary represents a summary of an image manifest.
     *      */
    ImageManifestSummary: {
      /**
       * @description ID is the content-addressable ID of an image and is the same as the
       *     digest of the image manifest.
       *
       * @example sha256:95869fbcf224d947ace8d61d0e931d49e31bb7fc67fffbbe9c3198c33aa8e93f
       */
      ID: string;
      Descriptor: components["schemas"]["OCIDescriptor"];
      /**
       * @description Indicates whether all the child content (image config, layers) is fully available locally.
       * @example true
       */
      Available: boolean;
      Size: {
        /**
         * Format: int64
         * @description Total is the total size (in bytes) of all the locally present
         *     data (both distributable and non-distributable) that's related to
         *     this manifest and its children.
         *     This equal to the sum of [Content] size AND all the sizes in the
         *     [Size] struct present in the Kind-specific data struct.
         *     For example, for an image kind (Kind == "image")
         *     this would include the size of the image content and unpacked
         *     image snapshots ([Size.Content] + [ImageData.Size.Unpacked]).
         *
         * @example 8213251
         */
        Total: number;
        /**
         * Format: int64
         * @description Content is the size (in bytes) of all the locally present
         *     content in the content store (e.g. image config, layers)
         *     referenced by this manifest and its children.
         *     This only includes blobs in the content store.
         *
         * @example 3987495
         */
        Content: number;
      };
      /**
       * @description The kind of the manifest.
       *
       *     kind         | description
       *     -------------|-----------------------------------------------------------
       *     image        | Image manifest that can be used to start a container.
       *     attestation  | Attestation manifest produced by the Buildkit builder for a specific image manifest.
       *
       * @example image
       * @enum {string}
       */
      Kind: "image" | "attestation" | "unknown";
      /** @description The image data for the image manifest.
       *     This field is only populated when Kind is "image".
       *      */
      ImageData?: {
        Platform: components["schemas"]["OCIPlatform"];
        /**
         * @description The IDs of the containers that are using this image.
         *
         * @example [
         *       "ede54ee1fda366ab42f824e8a5ffd195155d853ceaec74a927f249ea270c7430",
         *       "abadbce344c096744d8d6071a90d474d28af8f1034b5ea9fb03c3f4bfc6d005e"
         *     ]
         */
        Containers: string[];
        Size: {
          /**
           * Format: int64
           * @description Unpacked is the size (in bytes) of the locally unpacked
           *     (uncompressed) image content that's directly usable by the containers
           *     running this image.
           *     It's independent of the distributable content - e.g.
           *     the image might still have an unpacked data that's still used by
           *     some container even when the distributable/compressed content is
           *     already gone.
           *
           * @example 3987495
           */
          Unpacked: number;
        };
      } | null;
      /** @description The image data for the attestation manifest.
       *     This field is only populated when Kind is "attestation".
       *      */
      AttestationData?: {
        /**
         * @description The digest of the image manifest that this attestation is for.
         *
         * @example sha256:95869fbcf224d947ace8d61d0e931d49e31bb7fc67fffbbe9c3198c33aa8e93f
         */
        For: string;
      } | null;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  ContainerList: {
    parameters: {
      query?: {
        /** @description Return all containers. By default, only running containers are shown.
         *      */
        all?: boolean;
        /** @description Return this number of most recently created containers, including
         *     non-running ones.
         *      */
        limit?: number;
        /** @description Return the size of container as fields `SizeRw` and `SizeRootFs`.
         *      */
        size?: boolean;
        /** @description Filters to process on the container list, encoded as JSON (a
         *     `map[string][]string`). For example, `{"status": ["paused"]}` will
         *     only return paused containers.
         *
         *     Available filters:
         *
         *     - `ancestor`=(`<image-name>[:<tag>]`, `<image id>`, or `<image@digest>`)
         *     - `before`=(`<container id>` or `<container name>`)
         *     - `expose`=(`<port>[/<proto>]`|`<startport-endport>/[<proto>]`)
         *     - `exited=<int>` containers with exit code of `<int>`
         *     - `health`=(`starting`|`healthy`|`unhealthy`|`none`)
         *     - `id=<ID>` a container's ID
         *     - `isolation=`(`default`|`process`|`hyperv`) (Windows daemon only)
         *     - `is-task=`(`true`|`false`)
         *     - `label=key` or `label="key=value"` of a container label
         *     - `name=<name>` a container's name
         *     - `network`=(`<network id>` or `<network name>`)
         *     - `publish`=(`<port>[/<proto>]`|`<startport-endport>/[<proto>]`)
         *     - `since`=(`<container id>` or `<container name>`)
         *     - `status=`(`created`|`restarting`|`running`|`removing`|`paused`|`exited`|`dead`)
         *     - `volume`=(`<volume name>` or `<mount point destination>`)
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerSummary"][];
        };
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerCreate: {
    parameters: {
      query?: {
        /** @description Assign the specified name to the container. Must match
         *     `/?[a-zA-Z0-9][a-zA-Z0-9_.-]+`.
         *      */
        name?: string;
        /** @description Platform in the format `os[/arch[/variant]]` used for image lookup.
         *
         *     When specified, the daemon checks if the requested image is present
         *     in the local image cache with the given OS and Architecture, and
         *     otherwise returns a `404` status.
         *
         *     If the option is not set, the host's native OS and Architecture are
         *     used to look up the image in the image cache. However, if no platform
         *     is passed and the given image does exist in the local image cache,
         *     but its OS or architecture does not match, the container is created
         *     with the available image, and a warning is added to the `Warnings`
         *     field in the response, for example;
         *
         *         WARNING: The requested image's platform (linux/arm64/v8) does not
         *                  match the detected host platform (linux/amd64) and no
         *                  specific platform was requested
         *      */
        platform?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Container to create */
    requestBody: {
      content: {
        "application/json": components["schemas"]["ContainerConfig"] & {
          HostConfig?: components["schemas"]["HostConfig"];
          NetworkingConfig?: components["schemas"]["NetworkingConfig"];
        };
        "application/octet-stream": components["schemas"]["ContainerConfig"] & {
          HostConfig?: components["schemas"]["HostConfig"];
          NetworkingConfig?: components["schemas"]["NetworkingConfig"];
        };
      };
    };
    responses: {
      /** @description Container created successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerCreateResponse"];
        };
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such image */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such image: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description conflict */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerInspect: {
    parameters: {
      query?: {
        /** @description Return the size of container as fields `SizeRw` and `SizeRootFs` */
        size?: boolean;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerInspectResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerTop: {
    parameters: {
      query?: {
        /** @description The arguments to pass to `ps`. For example, `aux` */
        ps_args?: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerTopResponse"];
          "text/plain": components["schemas"]["ContainerTopResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerLogs: {
    parameters: {
      query?: {
        /** @description Keep connection after returning logs. */
        follow?: boolean;
        /** @description Return logs from `stdout` */
        stdout?: boolean;
        /** @description Return logs from `stderr` */
        stderr?: boolean;
        /** @description Only return logs since this time, as a UNIX timestamp */
        since?: number;
        /** @description Only return logs before this time, as a UNIX timestamp */
        until?: number;
        /** @description Add timestamps to every log line */
        timestamps?: boolean;
        /** @description Only return this number of log lines from the end of the logs.
         *     Specify as an integer or `all` to output all log lines.
         *      */
        tail?: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description logs returned as a stream in response body.
       *     For the stream format, [see the documentation for the attach endpoint](#operation/ContainerAttach).
       *     Note that unlike the attach endpoint, the logs endpoint does not
       *     upgrade the connection and does not set Content-Type.
       *      */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": string;
          "application/vnd.docker.multiplexed-stream": string;
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerChanges: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description The list of changes */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example [
           *       {
           *         "Path": "/dev",
           *         "Kind": 0
           *       },
           *       {
           *         "Path": "/dev/kmsg",
           *         "Kind": 1
           *       },
           *       {
           *         "Path": "/test",
           *         "Kind": 1
           *       }
           *     ] */
          "application/json": components["schemas"]["FilesystemChange"][];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerExport: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": components["schemas"]["ErrorResponse"];
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/octet-stream": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerStats: {
    parameters: {
      query?: {
        /** @description Stream the output. If false, the stats will be output once and then
         *     it will disconnect.
         *      */
        stream?: boolean;
        /** @description Only get a single stat instead of waiting for 2 cycles. Must be used
         *     with `stream=false`.
         *      */
        "one-shot"?: boolean;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerStatsResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerResize: {
    parameters: {
      query: {
        /** @description Height of the TTY session in characters */
        h: number;
        /** @description Width of the TTY session in characters */
        w: number;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["ErrorResponse"];
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description cannot resize container */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerStart: {
    parameters: {
      query?: {
        /** @description Override the key sequence for detaching a container. Format is a
         *     single character `[a-Z]` or `ctrl-<value>` where `<value>` is one
         *     of: `a-z`, `@`, `^`, `[`, `,` or `_`.
         *      */
        detachKeys?: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description container already started */
      304: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerStop: {
    parameters: {
      query?: {
        /** @description Signal to send to the container as an integer or string (e.g. `SIGINT`).
         *      */
        signal?: string;
        /** @description Number of seconds to wait before killing the container */
        t?: number;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description container already stopped */
      304: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerRestart: {
    parameters: {
      query?: {
        /** @description Signal to send to the container as an integer or string (e.g. `SIGINT`).
         *      */
        signal?: string;
        /** @description Number of seconds to wait before killing the container */
        t?: number;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerKill: {
    parameters: {
      query?: {
        /** @description Signal to send to the container as an integer or string (e.g. `SIGINT`).
         *      */
        signal?: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description container is not running */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "Container d37cde0fe4ad63c3a7252023b2f9800282894247d145cb5933ddf6e52cc03a28 is not running"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerUpdate: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Resources"] & {
          RestartPolicy?: components["schemas"]["RestartPolicy"];
        };
      };
    };
    responses: {
      /** @description The container has been updated. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerUpdateResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerRename: {
    parameters: {
      query: {
        /** @description New name for the container */
        name: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description name already in use */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerPause: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerUnpause: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerAttach: {
    parameters: {
      query?: {
        /** @description Override the key sequence for detaching a container.Format is a single
         *     character `[a-Z]` or `ctrl-<value>` where `<value>` is one of: `a-z`,
         *     `@`, `^`, `[`, `,` or `_`.
         *      */
        detachKeys?: string;
        /** @description Replay previous logs from the container.
         *
         *     This is useful for attaching to a container that has started and you
         *     want to output everything since the container started.
         *
         *     If `stream` is also enabled, once all the previous output has been
         *     returned, it will seamlessly transition into streaming current
         *     output.
         *      */
        logs?: boolean;
        /** @description Stream attached streams from the time the request was made onwards.
         *      */
        stream?: boolean;
        /** @description Attach to `stdin` */
        stdin?: boolean;
        /** @description Attach to `stdout` */
        stdout?: boolean;
        /** @description Attach to `stderr` */
        stderr?: boolean;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error, hints proxy about hijacking */
      101: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no error, no upgrade header found */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerAttachWebsocket: {
    parameters: {
      query?: {
        /** @description Override the key sequence for detaching a container.Format is a single
         *     character `[a-Z]` or `ctrl-<value>` where `<value>` is one of: `a-z`,
         *     `@`, `^`, `[`, `,`, or `_`.
         *      */
        detachKeys?: string;
        /** @description Return logs */
        logs?: boolean;
        /** @description Return stream */
        stream?: boolean;
        /** @description Attach to `stdin` */
        stdin?: boolean;
        /** @description Attach to `stdout` */
        stdout?: boolean;
        /** @description Attach to `stderr` */
        stderr?: boolean;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error, hints proxy about hijacking */
      101: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no error, no upgrade header found */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerWait: {
    parameters: {
      query?: {
        /** @description Wait until a container state reaches the given condition.
         *
         *     Defaults to `not-running` if omitted or empty.
         *      */
        condition?: "not-running" | "next-exit" | "removed";
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description The container has exit. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ContainerWaitResponse"];
        };
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerDelete: {
    parameters: {
      query?: {
        /** @description Remove anonymous volumes associated with the container. */
        v?: boolean;
        /** @description If the container is running, kill it before removing it. */
        force?: boolean;
        /** @description Remove the specified link associated with the container. */
        link?: boolean;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description conflict */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "You cannot remove a running container: c2ada9df5af8. Stop the\ncontainer before attempting removal or force remove\n"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerArchive: {
    parameters: {
      query: {
        /** @description Resource in the container’s filesystem to archive. */
        path: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/x-tar": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Container or path does not exist */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/x-tar": components["schemas"]["ErrorResponse"];
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/x-tar": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PutContainerArchive: {
    parameters: {
      query: {
        /** @description Path to a directory in the container to extract the archive’s contents into.  */
        path: string;
        /** @description If `1`, `true`, or `True` then it will be an error if unpacking the
         *     given content would cause an existing directory to be replaced with
         *     a non-directory and vice versa.
         *      */
        noOverwriteDirNonDir?: string;
        /** @description If `1`, `true`, then it will copy UID/GID maps to the dest file or
         *     dir
         *      */
        copyUIDGID?: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    /** @description The input stream must be a tar archive compressed with one of the
     *     following algorithms: `identity` (no compression), `gzip`, `bzip2`,
     *     or `xz`.
     *      */
    requestBody: {
      content: {
        "application/x-tar": string;
        "application/octet-stream": string;
      };
    };
    responses: {
      /** @description The content was extracted successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "not a directory"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Permission denied, the volume or container rootfs is marked as read-only. */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description No such container or path does not exist inside the container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerArchiveInfo: {
    parameters: {
      query: {
        /** @description Resource in the container’s filesystem to archive. */
        path: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the container */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          /** @description A base64 - encoded JSON object with some filesystem header
           *     information about the path
           *      */
          "X-Docker-Container-Path-Stat"?: string;
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Container or path does not exist */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerPrune: {
    parameters: {
      query?: {
        /** @description Filters to process on the prune list, encoded as JSON (a `map[string][]string`).
         *
         *     Available filters:
         *     - `until=<timestamp>` Prune containers created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine’s time.
         *     - `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune containers with (or without, in case `label!=...` is used) the specified labels.
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @description Container IDs that were deleted */
            ContainersDeleted?: string[];
            /**
             * Format: int64
             * @description Disk space reclaimed in bytes
             */
            SpaceReclaimed?: number;
          };
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageList: {
    parameters: {
      query?: {
        /** @description Show all images. Only images from a final layer (no children) are shown by default. */
        all?: boolean;
        /** @description A JSON encoded value of the filters (a `map[string][]string`) to
         *     process on the images list.
         *
         *     Available filters:
         *
         *     - `before`=(`<image-name>[:<tag>]`,  `<image id>` or `<image@digest>`)
         *     - `dangling=true`
         *     - `label=key` or `label="key=value"` of an image label
         *     - `reference`=(`<image-name>[:<tag>]`)
         *     - `since`=(`<image-name>[:<tag>]`,  `<image id>` or `<image@digest>`)
         *     - `until=<timestamp>`
         *      */
        filters?: string;
        /** @description Compute and show shared size as a `SharedSize` field on each image. */
        "shared-size"?: boolean;
        /** @description Show digest information as a `RepoDigests` field on each image. */
        digests?: boolean;
        /** @description Include `Manifests` in the image summary. */
        manifests?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Summary image data for the images matching the query */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ImageSummary"][];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageBuild: {
    parameters: {
      query?: {
        /** @description Path within the build context to the `Dockerfile`. This is ignored if `remote` is specified and points to an external `Dockerfile`. */
        dockerfile?: string;
        /** @description A name and optional tag to apply to the image in the `name:tag` format. If you omit the tag the default `latest` value is assumed. You can provide several `t` parameters. */
        t?: string;
        /** @description Extra hosts to add to /etc/hosts */
        extrahosts?: string;
        /** @description A Git repository URI or HTTP/HTTPS context URI. If the URI points to a single text file, the file’s contents are placed into a file called `Dockerfile` and the image is built from that file. If the URI points to a tarball, the file is downloaded by the daemon and the contents therein used as the context for the build. If the URI points to a tarball and the `dockerfile` parameter is also specified, there must be a file with the corresponding path inside the tarball. */
        remote?: string;
        /** @description Suppress verbose build output. */
        q?: boolean;
        /** @description Do not use the cache when building the image. */
        nocache?: boolean;
        /** @description JSON array of images used for build cache resolution. */
        cachefrom?: string;
        /** @description Attempt to pull the image even if an older image exists locally. */
        pull?: string;
        /** @description Remove intermediate containers after a successful build. */
        rm?: boolean;
        /** @description Always remove intermediate containers, even upon failure. */
        forcerm?: boolean;
        /** @description Set memory limit for build. */
        memory?: number;
        /** @description Total memory (memory + swap). Set as `-1` to disable swap. */
        memswap?: number;
        /** @description CPU shares (relative weight). */
        cpushares?: number;
        /** @description CPUs in which to allow execution (e.g., `0-3`, `0,1`). */
        cpusetcpus?: string;
        /** @description The length of a CPU period in microseconds. */
        cpuperiod?: number;
        /** @description Microseconds of CPU time that the container can get in a CPU period. */
        cpuquota?: number;
        /** @description JSON map of string pairs for build-time variables. Users pass these values at build-time. Docker uses the buildargs as the environment context for commands run via the `Dockerfile` RUN instruction, or for variable expansion in other `Dockerfile` instructions. This is not meant for passing secret values.
         *
         *     For example, the build arg `FOO=bar` would become `{"FOO":"bar"}` in JSON. This would result in the query parameter `buildargs={"FOO":"bar"}`. Note that `{"FOO":"bar"}` should be URI component encoded.
         *
         *     [Read more about the buildargs instruction.](https://docs.docker.com/engine/reference/builder/#arg)
         *      */
        buildargs?: string;
        /** @description Size of `/dev/shm` in bytes. The size must be greater than 0. If omitted the system uses 64MB. */
        shmsize?: number;
        /** @description Squash the resulting images layers into a single layer. *(Experimental release only.)* */
        squash?: boolean;
        /** @description Arbitrary key/value labels to set on the image, as a JSON map of string pairs. */
        labels?: string;
        /** @description Sets the networking mode for the run commands during build. Supported
         *     standard values are: `bridge`, `host`, `none`, and `container:<name|id>`.
         *     Any other value is taken as a custom network's name or ID to which this
         *     container should connect to.
         *      */
        networkmode?: string;
        /** @description Platform in the format os[/arch[/variant]] */
        platform?: string;
        /** @description Target build stage */
        target?: string;
        /** @description BuildKit output configuration */
        outputs?: string;
        /** @description Version of the builder backend to use.
         *
         *     - `1` is the first generation classic (deprecated) builder in the Docker daemon (default)
         *     - `2` is [BuildKit](https://github.com/moby/buildkit)
         *      */
        version?: "1" | "2";
      };
      header?: {
        "Content-type"?: "application/x-tar";
        /** @description This is a base64-encoded JSON object with auth configurations for multiple registries that a build may refer to.
         *
         *     The key is a registry URL, and the value is an auth configuration object, [as described in the authentication section](#section/Authentication). For example:
         *
         *     ```
         *     {
         *       "docker.example.com": {
         *         "username": "janedoe",
         *         "password": "hunter2"
         *       },
         *       "https://index.docker.io/v1/": {
         *         "username": "mobydock",
         *         "password": "conta1n3rize14"
         *       }
         *     }
         *     ```
         *
         *     Only the registry domain name (and port if not the default 443) are required. However, for legacy reasons, the Docker Hub registry must be specified with both a `https://` prefix and a `/v1/` suffix even though Docker will prefer to use the v2 registry API.
         *      */
        "X-Registry-Config"?: string;
      };
      path?: never;
      cookie?: never;
    };
    /** @description A tar archive compressed with one of the following algorithms: identity (no compression), gzip, bzip2, xz. */
    requestBody?: {
      content: {
        "application/octet-stream": string;
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  BuildPrune: {
    parameters: {
      query?: {
        /** @description Amount of disk space in bytes to keep for cache
         *
         *     > **Deprecated**: This parameter is deprecated and has been renamed to "reserved-space".
         *     > It is kept for backward compatibility and will be removed in API v1.49.
         *      */
        "keep-storage"?: number;
        /** @description Amount of disk space in bytes to keep for cache */
        "reserved-space"?: number;
        /** @description Maximum amount of disk space allowed to keep for cache */
        "max-used-space"?: number;
        /** @description Target amount of free disk space after pruning */
        "min-free-space"?: number;
        /** @description Remove all types of build cache */
        all?: boolean;
        /** @description A JSON encoded value of the filters (a `map[string][]string`) to
         *     process on the list of build cache objects.
         *
         *     Available filters:
         *
         *     - `until=<timestamp>` remove cache older than `<timestamp>`. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon's local time.
         *     - `id=<id>`
         *     - `parent=<id>`
         *     - `type=<string>`
         *     - `description=<string>`
         *     - `inuse`
         *     - `shared`
         *     - `private`
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            CachesDeleted?: string[];
            /**
             * Format: int64
             * @description Disk space reclaimed in bytes
             */
            SpaceReclaimed?: number;
          };
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageCreate: {
    parameters: {
      query?: {
        /** @description Name of the image to pull. If the name includes a tag or digest, specific behavior applies:
         *
         *     - If only `fromImage` includes a tag, that tag is used.
         *     - If both `fromImage` and `tag` are provided, `tag` takes precedence.
         *     - If `fromImage` includes a digest, the image is pulled by digest, and `tag` is ignored.
         *     - If neither a tag nor digest is specified, all tags are pulled.
         *      */
        fromImage?: string;
        /** @description Source to import. The value may be a URL from which the image can be retrieved or `-` to read the image from the request body. This parameter may only be used when importing an image. */
        fromSrc?: string;
        /** @description Repository name given to an image when it is imported. The repo may include a tag. This parameter may only be used when importing an image. */
        repo?: string;
        /** @description Tag or digest. If empty when pulling an image, this causes all tags for the given image to be pulled. */
        tag?: string;
        /** @description Set commit message for imported image. */
        message?: string;
        /** @description Apply `Dockerfile` instructions to the image that is created,
         *     for example: `changes=ENV DEBUG=true`.
         *     Note that `ENV DEBUG=true` should be URI component encoded.
         *
         *     Supported `Dockerfile` instructions:
         *     `CMD`|`ENTRYPOINT`|`ENV`|`EXPOSE`|`ONBUILD`|`USER`|`VOLUME`|`WORKDIR`
         *      */
        changes?: string[];
        /** @description Platform in the format os[/arch[/variant]].
         *
         *     When used in combination with the `fromImage` option, the daemon checks
         *     if the given image is present in the local image cache with the given
         *     OS and Architecture, and otherwise attempts to pull the image. If the
         *     option is not set, the host's native OS and Architecture are used.
         *     If the given image does not exist in the local image cache, the daemon
         *     attempts to pull the image with the host's native OS and Architecture.
         *     If the given image does exists in the local image cache, but its OS or
         *     architecture does not match, a warning is produced.
         *
         *     When used with the `fromSrc` option to import an image from an archive,
         *     this option sets the platform information for the imported image. If
         *     the option is not set, the host's native OS and Architecture are used
         *     for the imported image.
         *      */
        platform?: string;
      };
      header?: {
        /** @description A base64url-encoded auth configuration.
         *
         *     Refer to the [authentication section](#section/Authentication) for
         *     details.
         *      */
        "X-Registry-Auth"?: string;
      };
      path?: never;
      cookie?: never;
    };
    /** @description Image content if the value `-` has been specified in fromSrc query parameter */
    requestBody?: {
      content: {
        "text/plain": string;
        "application/octet-stream": string;
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description repository does not exist or no read access */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageInspect: {
    parameters: {
      query?: {
        /** @description Include Manifests in the image summary. */
        manifests?: boolean;
      };
      header?: never;
      path: {
        /** @description Image name or id */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ImageInspect"];
        };
      };
      /** @description No such image */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such image: someimage (tag: latest)"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageHistory: {
    parameters: {
      query?: {
        /** @description JSON-encoded OCI platform to select the platform-variant.
         *     If omitted, it defaults to any locally available platform,
         *     prioritizing the daemon's host platform.
         *
         *     If the daemon provides a multi-platform image store, this selects
         *     the platform-variant to show the history for. If the image is
         *     a single-platform image, or if the multi-platform image does not
         *     provide a variant matching the given platform, an error is returned.
         *
         *     Example: `{"os": "linux", "architecture": "arm", "variant": "v5"}`
         *      */
        platform?: string;
      };
      header?: never;
      path: {
        /** @description Image name or ID */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description List of image layers */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example [
           *       {
           *         "Id": "3db9c44f45209632d6050b35958829c3a2aa256d81b9a7be45b362ff85c54710",
           *         "Created": 1398108230,
           *         "CreatedBy": "/bin/sh -c #(nop) ADD file:eb15dbd63394e063b805a3c32ca7bf0266ef64676d5a6fab4801f2e81e2a5148 in /",
           *         "Tags": [
           *           "ubuntu:lucid",
           *           "ubuntu:10.04"
           *         ],
           *         "Size": 182964289,
           *         "Comment": ""
           *       },
           *       {
           *         "Id": "6cfa4d1f33fb861d4d114f43b25abd0ac737509268065cdfd69d544a59c85ab8",
           *         "Created": 1398108222,
           *         "CreatedBy": "/bin/sh -c #(nop) MAINTAINER Tianon Gravi <admwiggin@gmail.com> - mkimage-debootstrap.sh -i iproute,iputils-ping,ubuntu-minimal -t lucid.tar.xz lucid http://archive.ubuntu.com/ubuntu/",
           *         "Tags": [],
           *         "Size": 0,
           *         "Comment": ""
           *       },
           *       {
           *         "Id": "511136ea3c5a64f264b78b5433614aec563103b4d4702f3ba7d4d2698e22c158",
           *         "Created": 1371157430,
           *         "CreatedBy": "",
           *         "Tags": [
           *           "scratch12:latest",
           *           "scratch:latest"
           *         ],
           *         "Size": 0,
           *         "Comment": "Imported from -"
           *       }
           *     ] */
          "application/json": {
            Id: string;
            /** Format: int64 */
            Created: number;
            CreatedBy: string;
            Tags: string[];
            /** Format: int64 */
            Size: number;
            Comment: string;
          }[];
        };
      };
      /** @description No such image */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImagePush: {
    parameters: {
      query?: {
        /** @description Tag of the image to push. For example, `latest`. If no tag is provided,
         *     all tags of the given image that are present in the local image store
         *     are pushed.
         *      */
        tag?: string;
        /** @description JSON-encoded OCI platform to select the platform-variant to push.
         *     If not provided, all available variants will attempt to be pushed.
         *
         *     If the daemon provides a multi-platform image store, this selects
         *     the platform-variant to push to the registry. If the image is
         *     a single-platform image, or if the multi-platform image does not
         *     provide a variant matching the given platform, an error is returned.
         *
         *     Example: `{"os": "linux", "architecture": "arm", "variant": "v5"}`
         *      */
        platform?: string;
      };
      header: {
        /** @description A base64url-encoded auth configuration.
         *
         *     Refer to the [authentication section](#section/Authentication) for
         *     details.
         *      */
        "X-Registry-Auth": string;
      };
      path: {
        /** @description Name of the image to push. For example, `registry.example.com/myimage`.
         *     The image must be present in the local image store with the same name.
         *
         *     The name should be provided without tag; if a tag is provided, it
         *     is ignored. For example, `registry.example.com/myimage:latest` is
         *     considered equivalent to `registry.example.com/myimage`.
         *
         *     Use the `tag` parameter to specify the tag to push.
         *      */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description No such image */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageTag: {
    parameters: {
      query?: {
        /** @description The repository to tag in. For example, `someuser/someimage`. */
        repo?: string;
        /** @description The name of the new tag. */
        tag?: string;
      };
      header?: never;
      path: {
        /** @description Image name or ID to tag. */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description No such image */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Conflict */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageDelete: {
    parameters: {
      query?: {
        /** @description Remove the image even if it is being used by stopped containers or has other tags */
        force?: boolean;
        /** @description Do not delete untagged parent images */
        noprune?: boolean;
        /** @description Select platform-specific content to delete.
         *     Multiple values are accepted.
         *     Each platform is a OCI platform encoded as a JSON string.
         *      */
        platforms?: string[];
      };
      header?: never;
      path: {
        /** @description Image name or ID */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description The image was deleted successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example [
           *       {
           *         "Untagged": "3e2f21a89f"
           *       },
           *       {
           *         "Deleted": "3e2f21a89f"
           *       },
           *       {
           *         "Deleted": "53b4f83ac9"
           *       }
           *     ] */
          "application/json": components["schemas"]["ImageDeleteResponseItem"][];
        };
      };
      /** @description No such image */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Conflict */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageSearch: {
    parameters: {
      query: {
        /** @description Term to search */
        term: string;
        /** @description Maximum number of results to return */
        limit?: number;
        /** @description A JSON encoded value of the filters (a `map[string][]string`) to process on the images list. Available filters:
         *
         *     - `is-official=(true|false)`
         *     - `stars=<number>` Matches images that has at least 'number' stars.
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example [
           *       {
           *         "description": "A minimal Docker image based on Alpine Linux with a complete package index and only 5 MB in size!",
           *         "is_official": true,
           *         "is_automated": false,
           *         "name": "alpine",
           *         "star_count": 10093
           *       },
           *       {
           *         "description": "Busybox base image.",
           *         "is_official": true,
           *         "is_automated": false,
           *         "name": "Busybox base image.",
           *         "star_count": 3037
           *       },
           *       {
           *         "description": "The PostgreSQL object-relational database system provides reliability and data integrity.",
           *         "is_official": true,
           *         "is_automated": false,
           *         "name": "postgres",
           *         "star_count": 12408
           *       }
           *     ] */
          "application/json": {
            description?: string;
            is_official?: boolean;
            /**
             * @description Whether this repository has automated builds enabled.
             *
             *     <p><br /></p>
             *
             *     > **Deprecated**: This field is deprecated and will always be "false".
             *
             * @example false
             */
            is_automated?: boolean;
            name?: string;
            star_count?: number;
          }[];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImagePrune: {
    parameters: {
      query?: {
        /** @description Filters to process on the prune list, encoded as JSON (a `map[string][]string`). Available filters:
         *
         *     - `dangling=<boolean>` When set to `true` (or `1`), prune only
         *        unused *and* untagged images. When set to `false`
         *        (or `0`), all unused images are pruned.
         *     - `until=<string>` Prune images created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine’s time.
         *     - `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune images with (or without, in case `label!=...` is used) the specified labels.
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @description Images that were deleted */
            ImagesDeleted?: components["schemas"]["ImageDeleteResponseItem"][];
            /**
             * Format: int64
             * @description Disk space reclaimed in bytes
             */
            SpaceReclaimed?: number;
          };
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SystemAuth: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Authentication to check */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["AuthConfig"];
      };
    };
    responses: {
      /** @description An identity token was generated successfully. */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "Status": "Login Succeeded",
           *       "IdentityToken": "9cbaf023786cd7..."
           *     } */
          "application/json": {
            /** @description The status of the authentication */
            Status: string;
            /** @description An opaque token used to authenticate a user after a successful login */
            IdentityToken?: string;
          };
        };
      };
      /** @description No error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Auth error */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SystemInfo: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SystemInfo"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SystemVersion: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["SystemVersion"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SystemPing: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          /** @description Contains information about Swarm status of the daemon,
           *     and if the daemon is acting as a manager or worker node.
           *      */
          Swarm?:
            | "inactive"
            | "pending"
            | "error"
            | "locked"
            | "active/worker"
            | "active/manager";
          /** @description Max API Version the server supports */
          "Api-Version"?: string;
          /** @description If the server is running with experimental mode enabled */
          "Docker-Experimental"?: boolean;
          "Cache-Control"?: string;
          Pragma?: string;
          /** @description Default version of docker image builder
           *
           *     The default on Linux is version "2" (BuildKit), but the daemon
           *     can be configured to recommend version "1" (classic Builder).
           *     Windows does not yet support BuildKit for native Windows images,
           *     and uses "1" (classic builder) as a default.
           *
           *     This value is a recommendation as advertised by the daemon, and
           *     it is up to the client to choose which builder to use.
           *      */
          "Builder-Version"?: string;
          [name: string]: unknown;
        };
        content: {
          "text/plain": string;
        };
      };
      /** @description server error */
      500: {
        headers: {
          "Cache-Control"?: string;
          Pragma?: string;
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SystemPingHead: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          /** @description Contains information about Swarm status of the daemon,
           *     and if the daemon is acting as a manager or worker node.
           *      */
          Swarm?:
            | "inactive"
            | "pending"
            | "error"
            | "locked"
            | "active/worker"
            | "active/manager";
          /** @description Max API Version the server supports */
          "Api-Version"?: string;
          /** @description If the server is running with experimental mode enabled */
          "Docker-Experimental"?: boolean;
          "Cache-Control"?: string;
          Pragma?: string;
          /** @description Default version of docker image builder */
          "Builder-Version"?: string;
          [name: string]: unknown;
        };
        content: {
          "text/plain": string;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageCommit: {
    parameters: {
      query?: {
        /** @description The ID or name of the container to commit */
        container?: string;
        /** @description Repository name for the created image */
        repo?: string;
        /** @description Tag name for the create image */
        tag?: string;
        /** @description Commit message */
        comment?: string;
        /** @description Author of the image (e.g., `John Hannibal Smith <hannibal@a-team.com>`) */
        author?: string;
        /** @description Whether to pause the container before committing */
        pause?: boolean;
        /** @description `Dockerfile` instructions to apply while committing */
        changes?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description The container configuration */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["ContainerConfig"];
      };
    };
    responses: {
      /** @description no error */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["IDResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SystemEvents: {
    parameters: {
      query?: {
        /** @description Show events created since this timestamp then stream new events. */
        since?: string;
        /** @description Show events created until this timestamp then stop streaming. */
        until?: string;
        /** @description A JSON encoded value of filters (a `map[string][]string`) to process on the event list. Available filters:
         *
         *     - `config=<string>` config name or ID
         *     - `container=<string>` container name or ID
         *     - `daemon=<string>` daemon name or ID
         *     - `event=<string>` event type
         *     - `image=<string>` image name or ID
         *     - `label=<string>` image or container label
         *     - `network=<string>` network name or ID
         *     - `node=<string>` node ID
         *     - `plugin`=<string> plugin name or ID
         *     - `scope`=<string> local or swarm
         *     - `secret=<string>` secret name or ID
         *     - `service=<string>` service name or ID
         *     - `type=<string>` object to filter by, one of `container`, `image`, `volume`, `network`, `daemon`, `plugin`, `node`, `service`, `secret` or `config`
         *     - `volume=<string>` volume name
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["EventMessage"];
        };
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SystemDataUsage: {
    parameters: {
      query?: {
        /** @description Object types, for which to compute and return data.
         *      */
        type?: ("container" | "image" | "volume" | "build-cache")[];
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** Format: int64 */
            LayersSize?: number;
            Images?: components["schemas"]["ImageSummary"][];
            Containers?: components["schemas"]["ContainerSummary"][];
            Volumes?: components["schemas"]["Volume"][];
            BuildCache?: components["schemas"]["BuildCache"][];
          };
          "text/plain": {
            /** Format: int64 */
            LayersSize?: number;
            Images?: components["schemas"]["ImageSummary"][];
            Containers?: components["schemas"]["ContainerSummary"][];
            Volumes?: components["schemas"]["Volume"][];
            BuildCache?: components["schemas"]["BuildCache"][];
          };
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageGet: {
    parameters: {
      query?: {
        /** @description JSON encoded OCI platform describing a platform which will be used
         *     to select a platform-specific image to be saved if the image is
         *     multi-platform.
         *     If not provided, the full multi-platform image will be saved.
         *
         *     Example: `{"os": "linux", "architecture": "arm", "variant": "v5"}`
         *      */
        platform?: string;
      };
      header?: never;
      path: {
        /** @description Image name or ID */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/x-tar": string;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/x-tar": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageGetAll: {
    parameters: {
      query?: {
        /** @description Image names to filter by */
        names?: string[];
        /** @description JSON encoded OCI platform describing a platform which will be used
         *     to select a platform-specific image to be saved if the image is
         *     multi-platform.
         *     If not provided, the full multi-platform image will be saved.
         *
         *     Example: `{"os": "linux", "architecture": "arm", "variant": "v5"}`
         *      */
        platform?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/x-tar": string;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/x-tar": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ImageLoad: {
    parameters: {
      query?: {
        /** @description Suppress progress details during load. */
        quiet?: boolean;
        /** @description JSON encoded OCI platform describing a platform which will be used
         *     to select a platform-specific image to be load if the image is
         *     multi-platform.
         *     If not provided, the full multi-platform image will be loaded.
         *
         *     Example: `{"os": "linux", "architecture": "arm", "variant": "v5"}`
         *      */
        platform?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Tar archive containing images */
    requestBody?: {
      content: {
        "application/x-tar": string;
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ContainerExec: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID or name of container */
        id: string;
      };
      cookie?: never;
    };
    /** @description Exec configuration */
    requestBody: {
      content: {
        "application/json": {
          /** @description Attach to `stdin` of the exec command. */
          AttachStdin?: boolean;
          /** @description Attach to `stdout` of the exec command. */
          AttachStdout?: boolean;
          /** @description Attach to `stderr` of the exec command. */
          AttachStderr?: boolean;
          /**
           * @description Initial console size, as an `[height, width]` array.
           * @example [
           *       80,
           *       64
           *     ]
           */
          ConsoleSize?: number[] | null;
          /** @description Override the key sequence for detaching a container. Format is
           *     a single character `[a-Z]` or `ctrl-<value>` where `<value>`
           *     is one of: `a-z`, `@`, `^`, `[`, `,` or `_`.
           *      */
          DetachKeys?: string;
          /** @description Allocate a pseudo-TTY. */
          Tty?: boolean;
          /** @description A list of environment variables in the form `["VAR=value", ...]`.
           *      */
          Env?: string[];
          /** @description Command to run, as a string or array of strings. */
          Cmd?: string[];
          /**
           * @description Runs the exec process with extended privileges.
           * @default false
           */
          Privileged?: boolean;
          /** @description The user, and optionally, group to run the exec process inside
           *     the container. Format is one of: `user`, `user:group`, `uid`,
           *     or `uid:gid`.
           *      */
          User?: string;
          /** @description The working directory for the exec process inside the container.
           *      */
          WorkingDir?: string;
        };
      };
    };
    responses: {
      /** @description no error */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["IDResponse"];
        };
      };
      /** @description no such container */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such container: c2ada9df5af8"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description container is paused */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ExecStart: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Exec instance ID */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": {
          /**
           * @description Detach from the command.
           * @example false
           */
          Detach?: boolean;
          /**
           * @description Allocate a pseudo-TTY.
           * @example true
           */
          Tty?: boolean;
          /**
           * @description Initial console size, as an `[height, width]` array.
           * @example [
           *       80,
           *       64
           *     ]
           */
          ConsoleSize?: number[] | null;
        };
      };
    };
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description No such exec instance */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Container is stopped or paused */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ExecResize: {
    parameters: {
      query: {
        /** @description Height of the TTY session in characters */
        h: number;
        /** @description Width of the TTY session in characters */
        w: number;
      };
      header?: never;
      path: {
        /** @description Exec instance ID */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description No such exec instance */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ExecInspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Exec instance ID */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "CanRemove": false,
           *       "ContainerID": "b53ee82b53a40c7dca428523e34f741f3abc51d9f297a14ff874bf761b995126",
           *       "DetachKeys": "",
           *       "ExitCode": 2,
           *       "ID": "f33bbfb39f5b142420f4759b2348913bd4a8d1a6d7fd56499cb41a1bb91d7b3b",
           *       "OpenStderr": true,
           *       "OpenStdin": true,
           *       "OpenStdout": true,
           *       "ProcessConfig": {
           *         "arguments": [
           *           "-c",
           *           "exit 2"
           *         ],
           *         "entrypoint": "sh",
           *         "privileged": false,
           *         "tty": true,
           *         "user": "1000"
           *       },
           *       "Running": false,
           *       "Pid": 42000
           *     } */
          "application/json": {
            CanRemove?: boolean;
            DetachKeys?: string;
            ID?: string;
            Running?: boolean;
            ExitCode?: number;
            ProcessConfig?: components["schemas"]["ProcessConfig"];
            OpenStdin?: boolean;
            OpenStderr?: boolean;
            OpenStdout?: boolean;
            ContainerID?: string;
            /** @description The system process ID for the exec process. */
            Pid?: number;
          };
        };
      };
      /** @description No such exec instance */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  VolumeList: {
    parameters: {
      query?: {
        /** @description JSON encoded value of the filters (a `map[string][]string`) to
         *     process on the volumes list. Available filters:
         *
         *     - `dangling=<boolean>` When set to `true` (or `1`), returns all
         *        volumes that are not in use by a container. When set to `false`
         *        (or `0`), only volumes that are in use by one or more
         *        containers are returned.
         *     - `driver=<volume-driver-name>` Matches volumes based on their driver.
         *     - `label=<key>` or `label=<key>:<value>` Matches volumes based on
         *        the presence of a `label` alone or a `label` and a value.
         *     - `name=<volume-name>` Matches all or part of a volume name.
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Summary volume data that matches the query */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["VolumeListResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  VolumeCreate: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Volume configuration */
    requestBody: {
      content: {
        "application/json": components["schemas"]["VolumeCreateOptions"];
      };
    };
    responses: {
      /** @description The volume was created successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Volume"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  VolumeInspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Volume name or ID */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Volume"];
        };
      };
      /** @description No such volume */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  VolumeUpdate: {
    parameters: {
      query: {
        /** @description The version number of the volume being updated. This is required to
         *     avoid conflicting writes. Found in the volume's `ClusterVolume`
         *     field.
         *      */
        version: number;
      };
      header?: never;
      path: {
        /** @description The name or ID of the volume */
        name: string;
      };
      cookie?: never;
    };
    /** @description The spec of the volume to update. Currently, only Availability may
     *     change. All other fields must remain unchanged.
     *      */
    requestBody?: {
      content: {
        "application/json": {
          Spec?: components["schemas"]["ClusterVolumeSpec"];
        };
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such volume */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  VolumeDelete: {
    parameters: {
      query?: {
        /** @description Force the removal of the volume */
        force?: boolean;
      };
      header?: never;
      path: {
        /** @description Volume name or ID */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description The volume was removed */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description No such volume or volume driver */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Volume is in use and cannot be removed */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  VolumePrune: {
    parameters: {
      query?: {
        /** @description Filters to process on the prune list, encoded as JSON (a `map[string][]string`).
         *
         *     Available filters:
         *     - `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune volumes with (or without, in case `label!=...` is used) the specified labels.
         *     - `all` (`all=true`) - Consider all (local) volumes for pruning and not just anonymous volumes.
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @description Volumes that were deleted */
            VolumesDeleted?: string[];
            /**
             * Format: int64
             * @description Disk space reclaimed in bytes
             */
            SpaceReclaimed?: number;
          };
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NetworkList: {
    parameters: {
      query?: {
        /** @description JSON encoded value of the filters (a `map[string][]string`) to process
         *     on the networks list.
         *
         *     Available filters:
         *
         *     - `dangling=<boolean>` When set to `true` (or `1`), returns all
         *        networks that are not in use by a container. When set to `false`
         *        (or `0`), only networks that are in use by one or more
         *        containers are returned.
         *     - `driver=<driver-name>` Matches a network's driver.
         *     - `id=<network-id>` Matches all or part of a network ID.
         *     - `label=<key>` or `label=<key>=<value>` of a network label.
         *     - `name=<network-name>` Matches all or part of a network name.
         *     - `scope=["swarm"|"global"|"local"]` Filters networks by scope (`swarm`, `global`, or `local`).
         *     - `type=["custom"|"builtin"]` Filters networks by type. The `custom` keyword returns all user-defined networks.
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example [
           *       {
           *         "Name": "bridge",
           *         "Id": "f2de39df4171b0dc801e8002d1d999b77256983dfc63041c0f34030aa3977566",
           *         "Created": "2016-10-19T06:21:00.416543526Z",
           *         "Scope": "local",
           *         "Driver": "bridge",
           *         "EnableIPv4": true,
           *         "EnableIPv6": false,
           *         "Internal": false,
           *         "Attachable": false,
           *         "Ingress": false,
           *         "IPAM": {
           *           "Driver": "default",
           *           "Config": [
           *             {
           *               "Subnet": "172.17.0.0/16"
           *             }
           *           ]
           *         },
           *         "Options": {
           *           "com.docker.network.bridge.default_bridge": "true",
           *           "com.docker.network.bridge.enable_icc": "true",
           *           "com.docker.network.bridge.enable_ip_masquerade": "true",
           *           "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
           *           "com.docker.network.bridge.name": "docker0",
           *           "com.docker.network.driver.mtu": "1500"
           *         }
           *       },
           *       {
           *         "Name": "none",
           *         "Id": "e086a3893b05ab69242d3c44e49483a3bbbd3a26b46baa8f61ab797c1088d794",
           *         "Created": "0001-01-01T00:00:00Z",
           *         "Scope": "local",
           *         "Driver": "null",
           *         "EnableIPv4": false,
           *         "EnableIPv6": false,
           *         "Internal": false,
           *         "Attachable": false,
           *         "Ingress": false,
           *         "IPAM": {
           *           "Driver": "default",
           *           "Config": []
           *         },
           *         "Containers": {},
           *         "Options": {}
           *       },
           *       {
           *         "Name": "host",
           *         "Id": "13e871235c677f196c4e1ecebb9dc733b9b2d2ab589e30c539efeda84a24215e",
           *         "Created": "0001-01-01T00:00:00Z",
           *         "Scope": "local",
           *         "Driver": "host",
           *         "EnableIPv4": false,
           *         "EnableIPv6": false,
           *         "Internal": false,
           *         "Attachable": false,
           *         "Ingress": false,
           *         "IPAM": {
           *           "Driver": "default",
           *           "Config": []
           *         },
           *         "Containers": {},
           *         "Options": {}
           *       }
           *     ] */
          "application/json": components["schemas"]["Network"][];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NetworkInspect: {
    parameters: {
      query?: {
        /** @description Detailed inspect output for troubleshooting */
        verbose?: boolean;
        /** @description Filter the network by scope (swarm, global, or local) */
        scope?: string;
      };
      header?: never;
      path: {
        /** @description Network ID or name */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Network"];
        };
      };
      /** @description Network not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NetworkDelete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Network ID or name */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description operation not supported for pre-defined networks */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such network */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NetworkCreate: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Network configuration */
    requestBody: {
      content: {
        "application/json": {
          /**
           * @description The network's name.
           * @example my_network
           */
          Name: string;
          /**
           * @description Name of the network driver plugin to use.
           * @default bridge
           * @example bridge
           */
          Driver?: string;
          /** @description The level at which the network exists (e.g. `swarm` for cluster-wide
           *     or `local` for machine level).
           *      */
          Scope?: string;
          /** @description Restrict external access to the network. */
          Internal?: boolean;
          /**
           * @description Globally scoped network is manually attachable by regular
           *     containers from workers in swarm mode.
           *
           * @example true
           */
          Attachable?: boolean;
          /**
           * @description Ingress network is the network which provides the routing-mesh
           *     in swarm mode.
           *
           * @example false
           */
          Ingress?: boolean;
          /**
           * @description Creates a config-only network. Config-only networks are placeholder
           *     networks for network configurations to be used by other networks.
           *     Config-only networks cannot be used directly to run containers
           *     or services.
           *
           * @default false
           * @example false
           */
          ConfigOnly?: boolean;
          ConfigFrom?: components["schemas"]["ConfigReference"];
          IPAM?: components["schemas"]["IPAM"];
          /**
           * @description Enable IPv4 on the network.
           * @example true
           */
          EnableIPv4?: boolean;
          /**
           * @description Enable IPv6 on the network.
           * @example true
           */
          EnableIPv6?: boolean;
          /**
           * @description Network specific options to be used by the drivers.
           * @example {
           *       "com.docker.network.bridge.default_bridge": "true",
           *       "com.docker.network.bridge.enable_icc": "true",
           *       "com.docker.network.bridge.enable_ip_masquerade": "true",
           *       "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
           *       "com.docker.network.bridge.name": "docker0",
           *       "com.docker.network.driver.mtu": "1500"
           *     }
           */
          Options?: {
            [key: string]: string;
          };
          /**
           * @description User-defined key/value metadata.
           * @example {
           *       "com.example.some-label": "some-value",
           *       "com.example.some-other-label": "some-other-value"
           *     }
           */
          Labels?: {
            [key: string]: string;
          };
        };
      };
    };
    responses: {
      /** @description Network created successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["NetworkCreateResponse"];
        };
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Forbidden operation. This happens when trying to create a network named after a pre-defined network,
       *     or when trying to create an overlay network on a daemon which is not part of a Swarm cluster.
       *      */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description plugin not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NetworkConnect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Network ID or name */
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description The ID or name of the container to connect to the network. */
          Container?: string;
          EndpointConfig?: components["schemas"]["EndpointSettings"];
        };
      };
    };
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Operation forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Network or container not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NetworkDisconnect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Network ID or name */
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description The ID or name of the container to disconnect from the network.
           *      */
          Container?: string;
          /** @description Force the container to disconnect from the network.
           *      */
          Force?: boolean;
        };
      };
    };
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Operation not supported for swarm scoped networks */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Network or container not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NetworkPrune: {
    parameters: {
      query?: {
        /** @description Filters to process on the prune list, encoded as JSON (a `map[string][]string`).
         *
         *     Available filters:
         *     - `until=<timestamp>` Prune networks created before this timestamp. The `<timestamp>` can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. `10m`, `1h30m`) computed relative to the daemon machine’s time.
         *     - `label` (`label=<key>`, `label=<key>=<value>`, `label!=<key>`, or `label!=<key>=<value>`) Prune networks with (or without, in case `label!=...` is used) the specified labels.
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @description Networks that were deleted */
            NetworksDeleted?: string[];
          };
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginList: {
    parameters: {
      query?: {
        /** @description A JSON encoded value of the filters (a `map[string][]string`) to
         *     process on the plugin list.
         *
         *     Available filters:
         *
         *     - `capability=<capability name>`
         *     - `enable=<true>|<false>`
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description No error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Plugin"][];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  GetPluginPrivileges: {
    parameters: {
      query: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        remote: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PluginPrivilege"][];
          "text/plain": components["schemas"]["PluginPrivilege"][];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginPull: {
    parameters: {
      query: {
        /** @description Remote reference for plugin to install.
         *
         *     The `:latest` tag is optional, and is used as the default if omitted.
         *      */
        remote: string;
        /** @description Local name for the pulled plugin.
         *
         *     The `:latest` tag is optional, and is used as the default if omitted.
         *      */
        name?: string;
      };
      header?: {
        /** @description A base64url-encoded auth configuration to use when pulling a plugin
         *     from a registry.
         *
         *     Refer to the [authentication section](#section/Authentication) for
         *     details.
         *      */
        "X-Registry-Auth"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["PluginPrivilege"][];
        "text/plain": components["schemas"]["PluginPrivilege"][];
      };
    };
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginInspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Plugin"];
          "text/plain": components["schemas"]["Plugin"];
        };
      };
      /** @description plugin is not installed */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginDelete: {
    parameters: {
      query?: {
        /** @description Disable the plugin before removing. This may result in issues if the
         *     plugin is in use by a container.
         *      */
        force?: boolean;
      };
      header?: never;
      path: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Plugin"];
          "text/plain": components["schemas"]["Plugin"];
        };
      };
      /** @description plugin is not installed */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginEnable: {
    parameters: {
      query?: {
        /** @description Set the HTTP client timeout (in seconds) */
        timeout?: number;
      };
      header?: never;
      path: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description plugin is not installed */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginDisable: {
    parameters: {
      query?: {
        /** @description Force disable a plugin even if still in use.
         *      */
        force?: boolean;
      };
      header?: never;
      path: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description plugin is not installed */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginUpgrade: {
    parameters: {
      query: {
        /** @description Remote reference to upgrade to.
         *
         *     The `:latest` tag is optional, and is used as the default if omitted.
         *      */
        remote: string;
      };
      header?: {
        /** @description A base64url-encoded auth configuration to use when pulling a plugin
         *     from a registry.
         *
         *     Refer to the [authentication section](#section/Authentication) for
         *     details.
         *      */
        "X-Registry-Auth"?: string;
      };
      path: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["PluginPrivilege"][];
        "text/plain": components["schemas"]["PluginPrivilege"][];
      };
    };
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description plugin not installed */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginCreate: {
    parameters: {
      query: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        name: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** @description Path to tar containing plugin rootfs and manifest */
    requestBody?: {
      content: {
        "application/x-tar": string;
      };
    };
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginPush: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description plugin not installed */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  PluginSet: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The name of the plugin. The `:latest` tag is optional, and is the
         *     default if omitted.
         *      */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": string[];
      };
    };
    responses: {
      /** @description No error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Plugin not installed */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NodeList: {
    parameters: {
      query?: {
        /** @description Filters to process on the nodes list, encoded as JSON (a `map[string][]string`).
         *
         *     Available filters:
         *     - `id=<node id>`
         *     - `label=<engine label>`
         *     - `membership=`(`accepted`|`pending`)`
         *     - `name=<node name>`
         *     - `node.label=<node label>`
         *     - `role=`(`manager`|`worker`)`
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Node"][];
          "text/plain": components["schemas"]["Node"][];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NodeInspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The ID or name of the node */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Node"];
          "text/plain": components["schemas"]["Node"];
        };
      };
      /** @description no such node */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NodeDelete: {
    parameters: {
      query?: {
        /** @description Force remove a node from the swarm */
        force?: boolean;
      };
      header?: never;
      path: {
        /** @description The ID or name of the node */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such node */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  NodeUpdate: {
    parameters: {
      query: {
        /** @description The version number of the node object being updated. This is required
         *     to avoid conflicting writes.
         *      */
        version: number;
      };
      header?: never;
      path: {
        /** @description The ID of the node */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["NodeSpec"];
        "text/plain": components["schemas"]["NodeSpec"];
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such node */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SwarmInspect: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Swarm"];
          "text/plain": components["schemas"]["Swarm"];
        };
      };
      /** @description no such swarm */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SwarmInit: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description Listen address used for inter-manager communication, as well
           *     as determining the networking interface used for the VXLAN
           *     Tunnel Endpoint (VTEP). This can either be an address/port
           *     combination in the form `192.168.1.1:4567`, or an interface
           *     followed by a port number, like `eth0:4567`. If the port number
           *     is omitted, the default swarm listening port is used.
           *      */
          ListenAddr?: string;
          /** @description Externally reachable address advertised to other nodes. This
           *     can either be an address/port combination in the form
           *     `192.168.1.1:4567`, or an interface followed by a port number,
           *     like `eth0:4567`. If the port number is omitted, the port
           *     number from the listen address is used. If `AdvertiseAddr` is
           *     not specified, it will be automatically detected when possible.
           *      */
          AdvertiseAddr?: string;
          /** @description Address or interface to use for data path traffic (format:
           *     `<ip|interface>`), for example,  `192.168.1.1`, or an interface,
           *     like `eth0`. If `DataPathAddr` is unspecified, the same address
           *     as `AdvertiseAddr` is used.
           *
           *     The `DataPathAddr` specifies the address that global scope
           *     network drivers will publish towards other  nodes in order to
           *     reach the containers running on this node. Using this parameter
           *     it is possible to separate the container data traffic from the
           *     management traffic of the cluster.
           *      */
          DataPathAddr?: string;
          /**
           * Format: uint32
           * @description DataPathPort specifies the data path port number for data traffic.
           *     Acceptable port range is 1024 to 49151.
           *     if no port is set or is set to 0, default port 4789 will be used.
           *
           */
          DataPathPort?: number;
          /** @description Default Address Pool specifies default subnet pools for global
           *     scope networks.
           *      */
          DefaultAddrPool?: string[];
          /** @description Force creation of a new swarm. */
          ForceNewCluster?: boolean;
          /**
           * Format: uint32
           * @description SubnetSize specifies the subnet size of the networks created
           *     from the default subnet pool.
           *
           */
          SubnetSize?: number;
          Spec?: components["schemas"]["SwarmSpec"];
        };
        "text/plain": {
          /** @description Listen address used for inter-manager communication, as well
           *     as determining the networking interface used for the VXLAN
           *     Tunnel Endpoint (VTEP). This can either be an address/port
           *     combination in the form `192.168.1.1:4567`, or an interface
           *     followed by a port number, like `eth0:4567`. If the port number
           *     is omitted, the default swarm listening port is used.
           *      */
          ListenAddr?: string;
          /** @description Externally reachable address advertised to other nodes. This
           *     can either be an address/port combination in the form
           *     `192.168.1.1:4567`, or an interface followed by a port number,
           *     like `eth0:4567`. If the port number is omitted, the port
           *     number from the listen address is used. If `AdvertiseAddr` is
           *     not specified, it will be automatically detected when possible.
           *      */
          AdvertiseAddr?: string;
          /** @description Address or interface to use for data path traffic (format:
           *     `<ip|interface>`), for example,  `192.168.1.1`, or an interface,
           *     like `eth0`. If `DataPathAddr` is unspecified, the same address
           *     as `AdvertiseAddr` is used.
           *
           *     The `DataPathAddr` specifies the address that global scope
           *     network drivers will publish towards other  nodes in order to
           *     reach the containers running on this node. Using this parameter
           *     it is possible to separate the container data traffic from the
           *     management traffic of the cluster.
           *      */
          DataPathAddr?: string;
          /**
           * Format: uint32
           * @description DataPathPort specifies the data path port number for data traffic.
           *     Acceptable port range is 1024 to 49151.
           *     if no port is set or is set to 0, default port 4789 will be used.
           *
           */
          DataPathPort?: number;
          /** @description Default Address Pool specifies default subnet pools for global
           *     scope networks.
           *      */
          DefaultAddrPool?: string[];
          /** @description Force creation of a new swarm. */
          ForceNewCluster?: boolean;
          /**
           * Format: uint32
           * @description SubnetSize specifies the subnet size of the networks created
           *     from the default subnet pool.
           *
           */
          SubnetSize?: number;
          Spec?: components["schemas"]["SwarmSpec"];
        };
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": string;
          "text/plain": string;
        };
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is already part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SwarmJoin: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description Listen address used for inter-manager communication if the node
           *     gets promoted to manager, as well as determining the networking
           *     interface used for the VXLAN Tunnel Endpoint (VTEP).
           *      */
          ListenAddr?: string;
          /** @description Externally reachable address advertised to other nodes. This
           *     can either be an address/port combination in the form
           *     `192.168.1.1:4567`, or an interface followed by a port number,
           *     like `eth0:4567`. If the port number is omitted, the port
           *     number from the listen address is used. If `AdvertiseAddr` is
           *     not specified, it will be automatically detected when possible.
           *      */
          AdvertiseAddr?: string;
          /** @description Address or interface to use for data path traffic (format:
           *     `<ip|interface>`), for example,  `192.168.1.1`, or an interface,
           *     like `eth0`. If `DataPathAddr` is unspecified, the same address
           *     as `AdvertiseAddr` is used.
           *
           *     The `DataPathAddr` specifies the address that global scope
           *     network drivers will publish towards other nodes in order to
           *     reach the containers running on this node. Using this parameter
           *     it is possible to separate the container data traffic from the
           *     management traffic of the cluster.
           *      */
          DataPathAddr?: string;
          /** @description Addresses of manager nodes already participating in the swarm.
           *      */
          RemoteAddrs?: string[];
          /** @description Secret token for joining this swarm. */
          JoinToken?: string;
        };
        "text/plain": {
          /** @description Listen address used for inter-manager communication if the node
           *     gets promoted to manager, as well as determining the networking
           *     interface used for the VXLAN Tunnel Endpoint (VTEP).
           *      */
          ListenAddr?: string;
          /** @description Externally reachable address advertised to other nodes. This
           *     can either be an address/port combination in the form
           *     `192.168.1.1:4567`, or an interface followed by a port number,
           *     like `eth0:4567`. If the port number is omitted, the port
           *     number from the listen address is used. If `AdvertiseAddr` is
           *     not specified, it will be automatically detected when possible.
           *      */
          AdvertiseAddr?: string;
          /** @description Address or interface to use for data path traffic (format:
           *     `<ip|interface>`), for example,  `192.168.1.1`, or an interface,
           *     like `eth0`. If `DataPathAddr` is unspecified, the same address
           *     as `AdvertiseAddr` is used.
           *
           *     The `DataPathAddr` specifies the address that global scope
           *     network drivers will publish towards other nodes in order to
           *     reach the containers running on this node. Using this parameter
           *     it is possible to separate the container data traffic from the
           *     management traffic of the cluster.
           *      */
          DataPathAddr?: string;
          /** @description Addresses of manager nodes already participating in the swarm.
           *      */
          RemoteAddrs?: string[];
          /** @description Secret token for joining this swarm. */
          JoinToken?: string;
        };
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is already part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SwarmLeave: {
    parameters: {
      query?: {
        /** @description Force leave swarm, even if this is the last manager or that it will
         *     break the cluster.
         *      */
        force?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SwarmUpdate: {
    parameters: {
      query: {
        /** @description The version number of the swarm object being updated. This is
         *     required to avoid conflicting writes.
         *      */
        version: number;
        /** @description Rotate the worker join token. */
        rotateWorkerToken?: boolean;
        /** @description Rotate the manager join token. */
        rotateManagerToken?: boolean;
        /** @description Rotate the manager unlock key. */
        rotateManagerUnlockKey?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SwarmSpec"];
        "text/plain": components["schemas"]["SwarmSpec"];
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SwarmUnlockkey: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @description The swarm's unlock key. */
            UnlockKey?: string;
          };
          "text/plain": {
            /** @description The swarm's unlock key. */
            UnlockKey?: string;
          };
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SwarmUnlock: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description The swarm's unlock key. */
          UnlockKey?: string;
        };
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ServiceList: {
    parameters: {
      query?: {
        /** @description A JSON encoded value of the filters (a `map[string][]string`) to
         *     process on the services list.
         *
         *     Available filters:
         *
         *     - `id=<service id>`
         *     - `label=<service label>`
         *     - `mode=["replicated"|"global"]`
         *     - `name=<service name>`
         *      */
        filters?: string;
        /** @description Include service status, with count of running and desired tasks.
         *      */
        status?: boolean;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Service"][];
          "text/plain": components["schemas"]["Service"][];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ServiceCreate: {
    parameters: {
      query?: never;
      header?: {
        /** @description A base64url-encoded auth configuration for pulling from private
         *     registries.
         *
         *     Refer to the [authentication section](#section/Authentication) for
         *     details.
         *      */
        "X-Registry-Auth"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ServiceSpec"] &
          Record<string, never>;
      };
    };
    responses: {
      /** @description no error */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ServiceCreateResponse"];
        };
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description network is not eligible for services */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description name conflicts with an existing service */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ServiceInspect: {
    parameters: {
      query?: {
        /** @description Fill empty fields with default values. */
        insertDefaults?: boolean;
      };
      header?: never;
      path: {
        /** @description ID or name of service. */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Service"];
          "text/plain": components["schemas"]["Service"];
        };
      };
      /** @description no such service */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ServiceDelete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID or name of service. */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description no such service */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ServiceUpdate: {
    parameters: {
      query: {
        /** @description The version number of the service object being updated. This is
         *     required to avoid conflicting writes.
         *     This version number should be the value as currently set on the
         *     service *before* the update. You can find the current version by
         *     calling `GET /services/{id}`
         *      */
        version: number;
        /** @description If the `X-Registry-Auth` header is not specified, this parameter
         *     indicates where to find registry authorization credentials.
         *      */
        registryAuthFrom?: "spec" | "previous-spec";
        /** @description Set to this parameter to `previous` to cause a server-side rollback
         *     to the previous service spec. The supplied spec will be ignored in
         *     this case.
         *      */
        rollback?: string;
      };
      header?: {
        /** @description A base64url-encoded auth configuration for pulling from private
         *     registries.
         *
         *     Refer to the [authentication section](#section/Authentication) for
         *     details.
         *      */
        "X-Registry-Auth"?: string;
      };
      path: {
        /** @description ID or name of service. */
        id: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ServiceSpec"] &
          Record<string, never>;
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ServiceUpdateResponse"];
        };
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such service */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ServiceLogs: {
    parameters: {
      query?: {
        /** @description Show service context and extra details provided to logs. */
        details?: boolean;
        /** @description Keep connection after returning logs. */
        follow?: boolean;
        /** @description Return logs from `stdout` */
        stdout?: boolean;
        /** @description Return logs from `stderr` */
        stderr?: boolean;
        /** @description Only return logs since this time, as a UNIX timestamp */
        since?: number;
        /** @description Add timestamps to every log line */
        timestamps?: boolean;
        /** @description Only return this number of log lines from the end of the logs.
         *     Specify as an integer or `all` to output all log lines.
         *      */
        tail?: string;
      };
      header?: never;
      path: {
        /** @description ID or name of the service */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description logs returned as a stream in response body */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": string;
          "application/vnd.docker.multiplexed-stream": string;
        };
      };
      /** @description no such service */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
          /** @example {
           *       "message": "No such service: c2ada9df5af8"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  TaskList: {
    parameters: {
      query?: {
        /** @description A JSON encoded value of the filters (a `map[string][]string`) to
         *     process on the tasks list.
         *
         *     Available filters:
         *
         *     - `desired-state=(running | shutdown | accepted)`
         *     - `id=<task id>`
         *     - `label=key` or `label="key=value"`
         *     - `name=<task name>`
         *     - `node=<node id or name>`
         *     - `service=<service name>`
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Task"][];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  TaskInspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID of the task */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Task"];
        };
      };
      /** @description no such task */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  TaskLogs: {
    parameters: {
      query?: {
        /** @description Show task context and extra details provided to logs. */
        details?: boolean;
        /** @description Keep connection after returning logs. */
        follow?: boolean;
        /** @description Return logs from `stdout` */
        stdout?: boolean;
        /** @description Return logs from `stderr` */
        stderr?: boolean;
        /** @description Only return logs since this time, as a UNIX timestamp */
        since?: number;
        /** @description Add timestamps to every log line */
        timestamps?: boolean;
        /** @description Only return this number of log lines from the end of the logs.
         *     Specify as an integer or `all` to output all log lines.
         *      */
        tail?: string;
      };
      header?: never;
      path: {
        /** @description ID of the task */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description logs returned as a stream in response body */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": string;
          "application/vnd.docker.multiplexed-stream": string;
        };
      };
      /** @description no such task */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
          /** @example {
           *       "message": "No such task: c2ada9df5af8"
           *     } */
          "application/json": unknown;
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
          "application/vnd.docker.multiplexed-stream": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SecretList: {
    parameters: {
      query?: {
        /** @description A JSON encoded value of the filters (a `map[string][]string`) to
         *     process on the secrets list.
         *
         *     Available filters:
         *
         *     - `id=<secret id>`
         *     - `label=<key> or label=<key>=value`
         *     - `name=<secret name>`
         *     - `names=<secret name>`
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Secret"][];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SecretCreate: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["SecretSpec"] &
          Record<string, never>;
      };
    };
    responses: {
      /** @description no error */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["IDResponse"];
        };
      };
      /** @description name conflicts with an existing object */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SecretInspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID of the secret */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "ID": "ktnbjxoalbkvbvedmg1urrz8h",
           *       "Version": {
           *         "Index": 11
           *       },
           *       "CreatedAt": "2016-11-05T01:20:17.327670065Z",
           *       "UpdatedAt": "2016-11-05T01:20:17.327670065Z",
           *       "Spec": {
           *         "Name": "app-dev.crt",
           *         "Labels": {
           *           "foo": "bar"
           *         },
           *         "Driver": {
           *           "Name": "secret-bucket",
           *           "Options": {
           *             "OptionA": "value for driver option A",
           *             "OptionB": "value for driver option B"
           *           }
           *         }
           *       }
           *     } */
          "application/json": components["schemas"]["Secret"];
        };
      };
      /** @description secret not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SecretDelete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID of the secret */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description secret not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  SecretUpdate: {
    parameters: {
      query: {
        /** @description The version number of the secret object being updated. This is
         *     required to avoid conflicting writes.
         *      */
        version: number;
      };
      header?: never;
      path: {
        /** @description The ID or name of the secret */
        id: string;
      };
      cookie?: never;
    };
    /** @description The spec of the secret to update. Currently, only the Labels field
     *     can be updated. All other fields must remain unchanged from the
     *     [SecretInspect endpoint](#operation/SecretInspect) response values.
     *      */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["SecretSpec"];
        "text/plain": components["schemas"]["SecretSpec"];
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such secret */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ConfigList: {
    parameters: {
      query?: {
        /** @description A JSON encoded value of the filters (a `map[string][]string`) to
         *     process on the configs list.
         *
         *     Available filters:
         *
         *     - `id=<config id>`
         *     - `label=<key> or label=<key>=value`
         *     - `name=<config name>`
         *     - `names=<config name>`
         *      */
        filters?: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Config"][];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ConfigCreate: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["ConfigSpec"] &
          Record<string, never>;
      };
    };
    responses: {
      /** @description no error */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["IDResponse"];
        };
      };
      /** @description name conflicts with an existing object */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ConfigInspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID of the config */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "ID": "ktnbjxoalbkvbvedmg1urrz8h",
           *       "Version": {
           *         "Index": 11
           *       },
           *       "CreatedAt": "2016-11-05T01:20:17.327670065Z",
           *       "UpdatedAt": "2016-11-05T01:20:17.327670065Z",
           *       "Spec": {
           *         "Name": "app-dev.crt"
           *       }
           *     } */
          "application/json": components["schemas"]["Config"];
        };
      };
      /** @description config not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ConfigDelete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID of the config */
        id: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description config not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  ConfigUpdate: {
    parameters: {
      query: {
        /** @description The version number of the config object being updated. This is
         *     required to avoid conflicting writes.
         *      */
        version: number;
      };
      header?: never;
      path: {
        /** @description The ID or name of the config */
        id: string;
      };
      cookie?: never;
    };
    /** @description The spec of the config to update. Currently, only the Labels field
     *     can be updated. All other fields must remain unchanged from the
     *     [ConfigInspect endpoint](#operation/ConfigInspect) response values.
     *      */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["ConfigSpec"];
        "text/plain": components["schemas"]["ConfigSpec"];
      };
    };
    responses: {
      /** @description no error */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description no such config */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description node is not part of a swarm */
      503: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
          "text/plain": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  DistributionInspect: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Image name or id */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description descriptor and platform information */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DistributionInspect"];
        };
      };
      /** @description Failed authentication or no image found */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          /** @example {
           *       "message": "No such image: someimage (tag: latest)"
           *     } */
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  Session: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description no error, hijacking successful */
      101: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description bad parameter */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/vnd.docker.raw-stream": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
}
