from rethinkdb import RethinkDB
r = RethinkDB()


def connect_database(ip,port):
    r.connect(ip, port).repl()


def get_all_documents_in_table(database, table):
    cursor = r.db(database).table(table).run()
    return list(cursor)