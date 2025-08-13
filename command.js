#!/usr/bin/env node
"use strict";const s=require("commander"),n=new s.Command;n.name("shared-constants").description("Shared constants CLI").version("1.0.0");n.command("generate <name>").description("Generate shared constants").action(e=>{console.log(`Generating shared constants for ${e}...`)});n.parse(process.argv);
