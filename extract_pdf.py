import PyPDF2
from pathlib import Path
pdf_path = Path('Assignment Front End Programmer.pdf')
reader = PyPDF2.PdfReader(pdf_path.open('rb'))
for page in reader.pages:
    text = page.extract_text() or ''
    print(text)
