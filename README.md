# Zabbix to ConnectWise (Halo, or Autotask) Ticketing Integration

Automatically process Zabbix alerts and create tickets in ConnectWise PSA (or Halo, Autotask, etc.) with round-trip closure using n8n.

## Features

- **Multi-tenant support** - Use Zabbix tags to route alerts to the correct client in your ticketing system
- **Smart alerting** - Only fire after multiple occurrences to reduce noise
- **Round-trip closure** - Automatically close tickets in your PSA when Zabbix alerts are resolved
- **Direct ticket links** - Get clickable links from Zabbix alerts straight to your tickets

## What's Included

This repository contains:
- Zabbix webhook media type configuration

## Getting Started

For complete setup instructions, configuration details, and workflow examples, visit:

**[mspcopilot.io - Zabbix Ticketing Integration Guide](https://mspcopilot.io/zabbix-connectwise-integration)**

The guide covers:
- Setting up multi-tenant monitoring with Zabbix tags
- Configuring the webhook media type
- Creating alert actions
- Deploying and customizing the n8n workflow

## Requirements

- Zabbix server
- n8n instance ([how to host](https://mspcopilot.io/railway-to-host-n8n))
- [ConnectWise PSA](https://mspcopilot.io/n8n-nodes/connectwise-psa) (or another supported ticketing system like Autotask or Halo)

## Support

Visit [mspcopilot.io](https://mspcopilot.io) for documentation, guides, and additional n8n info.

## License

MIT