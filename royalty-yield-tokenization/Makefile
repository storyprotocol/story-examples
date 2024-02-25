.PHONY: all

all: clean install build

clean :; forge clean

install:
	yarn install
	forge install foundry-rs/forge-std --no-commit

build :; forge build