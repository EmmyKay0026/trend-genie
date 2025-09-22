import pytesseract
from PIL import Image
import pdfplumber

def extract_text_from_image(path):
    image = Image.open(path)
    return pytesseract.image_to_string(image)

def extract_text_from_pdf(path):
    with pdfplumber.open(path) as pdf:
        return "\n".join(page.extract_text() or '' for page in pdf.pages)
