CREATE TABLE accounts(id INTEGER PRIMARY KEY, name TEXT, balance NUMBER, isAsset BOOLEAN);
CREATE TABLE transactions(id INTEGER PRIMARY KEY, date TEXT, amount NUMBER);
CREATE TABLE account_transactions(id INTEGER PRIMARY KEY, accountId NUMBER, transactionId NUMBER, isReceiver BOOLEAN,
FOREIGN KEY(accountId) REFERENCES accounts(id),
FOREIGN KEY(transactionId) REFERENCES transactions(id));