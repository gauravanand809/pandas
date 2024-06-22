def is_strong_password(password):
    if not password.isalnum() or not password.islower():
        return False
    
    letters = []
    digits = []
    for char in password:
        if char.isdigit():
            digits.append(char)
        else:
            letters.append(char)
    
    if digits != sorted(digits):
        return False
    
    if letters != sorted(letters):
        return False
    
    first_digit_index = None
    for i, char in enumerate(password):
        if char.isdigit():
            first_digit_index = i
            break
    
    if first_digit_index is not None:
        if any(char.isdigit() for char in password[:first_digit_index]):
            return False

    return True

t = int(input().strip())
for _ in range(t):
    x = input().strip()
    if is_strong_password(x):
        print("YES")
    else:
        print("NO")
