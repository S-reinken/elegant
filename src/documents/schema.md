# Schema

The data is set up so that the set of accounts and transactions are both related and extensible with each other.

## Transactions

A transaction is made up of the following:

- Id (Primary Key)
- Date (date?)
- Amount (number)

There are many variations on these items, but every transaction, no matter where sourced, must have these basic components.

Also notice the HashId, this is an id that is uniquely calculated from the other pieces of data in the transaction. Also, in this case the db will not support transactions that are exact duplicates

## Accounts

An account entity has to have the following

- Id (Id)
- name (string)
- balance (number)
- is_asset (asset, liability)
- parent account (optional, Id)

An asset account makes a positive balance good, while a liability account is the reverse

Also, since accounts can be grouped together, each one can have a parent account or child accounts. The total transactions within an account include all at its same level and all within its children

## Account-Transaction

If you notice, we have a problem above of having a many-to-many relationship between Transactions and Accounts. Therefore we must have a join table between them coordinating the foreign keys between each one.

The Account-Transaction Table looks like this:

- accountId (Id)
- transactionId (Id)
- is_Receiver (boolean)

## Account-Alias

One major feature of Elegant is the ability to import from a variety of banks and credit card companies. In order to do this efficiently, we need a lookup table that will represent the user's settings for which receivers will translate to which accounts

The Account_Alias table looks like this:

- accountId (id)
- import_type (text)
- alias (text)

### Example
