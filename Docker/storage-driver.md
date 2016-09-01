Docker supports different [Storage Drivers](https://docs.docker.com/engine/userguide/storagedriver/selectadriver/) and by default uses [AUFS](https://en.wikipedia.org/wiki/Aufs) to map filesystems on top of each other.
AUFS is not in upstream Linux and Docker doesn't check if it is actually supported by the System.

What happens then is, that Docker tries to join two filesystems but ends up with a tmpfs mounted at the specified spot inside the container.

Luckily, it is not needed to install a new kernel or something. Just set the docker daemon to run with another storage driver like `device-mapper`.
