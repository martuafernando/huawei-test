# huawei-test

## Requirements

- Frontend:
  - NodeJs v20.17.0
  - NPM 10.8.2
- Backend: NodeJs v20.17.0
  - NodeJs v20.17.0
  - NPM 10.8.2
- Automation
  - Python3 3.10.12
  - bash

## Getting Started

### Backend

To run backend application, you can follow these steps:

1. Clone the repository

```bash
git clone https://github.com/martuafernando/huawei-test.git
cd huawei-test
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Run the development server

```bash
npm run start-backend
```

### Frontend

To run frontend application, you can follow these steps:

1. Clone the repository (skip if you clone it before)

```bash
git clone https://github.com/martuafernando/huawei-test.git
cd huawei-test
```

2. Install dependencies

```bash
npm install
```

3. Build the app

```bash
npm run build-frontend
```

4. Start the app

```bash
npm run start-frontend
```

### Automation Script

To set up the automation for data collection (via cron job), follow these steps:

1. Clone the repository (skip if you clone it before)

```bash
git clone https://github.com/martuafernando/huawei-test.git
cd huawei-test
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Create target directory and change the permission

```bash
  sudo mkdir -p /home/cron
  sudo chmod 777 /home/cron
```

4. Add cron script via cron.sh

```bash
  bash ./automation/cron.sh
```