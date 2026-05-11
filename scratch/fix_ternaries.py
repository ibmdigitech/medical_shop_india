import os
import re

def fix_ternaries(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.jsx', '.js')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Pattern 1: Any ₹ used as a ternary operator
                    # These usually look like `expression ₹ result : other`
                    # We'll look for ₹ followed by something then a colon
                    new_content = re.sub(r' ₹ ', ' ? ', content)
                    new_content = re.sub(r'₹ \(', '? (', new_content)
                    new_content = re.sub(r'₹ projects', '? projects', new_content)
                    new_content = re.sub(r'₹ <', '? <', new_content)
                    new_content = re.sub(r'₹ 180', '? 180', new_content)
                    new_content = re.sub(r'₹ 1.1', '? 1.1', new_content)
                    new_content = re.sub(r'₹ 1 :', '? 1 :', new_content)
                    new_content = re.sub(r'₹ 0 :', '? 0 :', new_content)
                    new_content = re.sub(r'₹ null', '? null', new_content)
                    new_content = re.sub(r'₹ {', '? {', new_content)
                    
                    # More generic: any ₹ that is followed by something and then eventually a :
                    # and isn't part of a string like "₹ 100"
                    # But that's risky.
                    
                    if content != new_content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Fixed: {path}")
                except Exception as e:
                    print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    fix_ternaries('src')
