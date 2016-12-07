from whoosh.index import create_in, open_dir
from whoosh.fields import *
from whoosh.qparser import QueryParser, FuzzyTermPlugin
from whoosh.query import *
from whoosh.collectors import TimeLimitCollector, TimeLimit
import os.path
import string

printable = set(string.printable)

def create_index(file_content):
    schema = Schema(code=TEXT(stored=True), Display=TEXT(stored=True))
    if not os.path.exists("loinc_code"):
        os.mkdir("loinc_code")
    ix = create_in("loinc_code",schema)
    writer = ix.writer()
    for index, line in enumerate(file_content):
        new_code = filter(lambda x: x in printable, line[0])
        new_display = filter(lambda x: x in printable, line[1])
        writer.add_document(code=unicode(new_code), Display=unicode(new_display))
    writer.commit()

# def perform_search(text):
#     ix = open_dir("code")
#     myquery = Or([Term("code", text), Term("Display", text)])
#     parser = QueryParser("Display", schema=ix.schema, termclass=FuzzyTerm)
#     #parser.add_plugin(FuzzyTermPlugin())
#     results = []
#     with ix.searcher() as searcher:
#         # c = searcher.collector(limit=None)
#         # tlc = TimeLimitCollector(c, timelimit=10)
#         res = searcher.search(FuzzyTerm("Display", text))
#         for item in list(res):
#             results.append([item['code'], item['Display']])
#     return results





if __name__ == '__main__':
    file_obj = open('loinc_code.csv', 'r')
    file_content = []
    for line in file_obj:
        line_list = line.split(',')
        #print line_list
        file_content.append([line_list[0], line_list[1]])
    create_index(file_content)
