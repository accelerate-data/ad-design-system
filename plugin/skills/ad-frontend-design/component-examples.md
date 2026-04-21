# Component Examples

Input/output examples showing how to implement AD-branded components.

## Example 1: Primary Button

**Input**: "Create a primary call-to-action button"

**Output**:
```html
<button class="btn-primary">
  Get Started
</button>

<style>
.btn-primary {
  background: #00b4d8;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  height: 40px;
  border: none;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.25, 1, 0.5, 1);
}
.btn-primary:hover {
  background: #0096b4;
}
</style>
```

## Example 2: Card Component

**Input**: "Create a content card for light mode"

**Output**:
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>

<style>
.card {
  background: white;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.card h3 {
  color: #03045e;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
}
.card p {
  color: #03045e;
  font-size: 14px;
  margin: 0;
}
</style>
```

## Example 3: Input Field with Error

**Input**: "Create a form input with error state"

**Output**:
```html
<div class="input-group error">
  <label for="email">Email</label>
  <input type="email" id="email" placeholder="Enter email">
  <span class="error-message">Please enter a valid email</span>
</div>

<style>
.input-group label {
  display: block;
  font-weight: 500;
  font-size: 14px;
  color: #03045e;
  margin-bottom: 4px;
}
.input-group input {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #f2f2f2;
  border-radius: 6px;
  font-size: 14px;
}
.input-group.error input {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}
.error-message {
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
}
</style>
```

## Example 4: Dark Mode Card

**Input**: "Create a card for dark mode"

**Output**:
```html
<div class="card-dark">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>

<style>
.card-dark {
  background: #1e2329;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 24px;
}
.card-dark h3 {
  color: #f2f2f2;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
}
.card-dark p {
  color: #f2f2f2;
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}
</style>
```

## Example 5: Navigation Item

**Input**: "Create a sidebar navigation item with active state"


**Output**:
```html
<nav class="sidebar">
  <a href="#" class="nav-item">Dashboard</a>
  <a href="#" class="nav-item active">Analytics</a>
  <a href="#" class="nav-item">Settings</a>
</nav>

<style>
.sidebar {
  width: 240px;
  background: #171c21;
  padding: 16px 0;
}
.nav-item {
  display: block;
  padding: 8px 16px;
  color: #f2f2f2;
  text-decoration: none;
  font-size: 14px;
  border-left: 3px solid transparent;
  transition: all 150ms cubic-bezier(0.25, 1, 0.5, 1);
}
.nav-item:hover {
  background: rgba(255,255,255,0.05);
}
.nav-item.active {
  color: #00b4d8;
  border-left-color: #00b4d8;
  background: rgba(0, 180, 216, 0.1);
}
</style>
```

## Example 6: Nav with Logo and Theme Toggle

**Input**: "Create a navigation bar with CDN logo that switches between dark and light variants on theme toggle"

**Output**:
```html
<nav class="topnav" id="topnav">
  <img
    src="http://assets.acceleratedata.ai/logo/product/ui/logo-dark-h32.svg"
    alt="Accelerate Data"
    class="nav-logo"
    id="nav-logo"
  />
  <div class="nav-actions">
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
      <span class="toggle-icon">&#9789;</span>
    </button>
  </div>
</nav>

<style>
.topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  background: white;
  border-bottom: 1px solid #f2f2f2;
  transition: background 200ms cubic-bezier(0.25, 1, 0.5, 1),
              border-color 200ms cubic-bezier(0.25, 1, 0.5, 1);
}
.topnav.dark {
  background: #171c21;
  border-bottom-color: rgba(255,255,255,0.1);
}
.nav-logo {
  height: 32px;
}
.theme-toggle {
  background: none;
  border: 1px solid #f2f2f2;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: #03045e;
  font-size: 18px;
  transition: all 150ms cubic-bezier(0.25, 1, 0.5, 1);
}
.topnav.dark .theme-toggle {
  border-color: rgba(255,255,255,0.1);
  color: #f2f2f2;
}
</style>

<script>
const CDN_BASE = 'http://assets.acceleratedata.ai/logo/product/ui/';
const nav = document.getElementById('topnav');
const logo = document.getElementById('nav-logo');
const toggle = document.getElementById('theme-toggle');
const icon = toggle.querySelector('.toggle-icon');

let dark = false;

toggle.addEventListener('click', () => {
  dark = !dark;
  nav.classList.toggle('dark', dark);
  logo.src = dark
    ? CDN_BASE + 'logo-light-h32.svg'
    : CDN_BASE + 'logo-dark-h32.svg';
  icon.textContent = dark ? '\u2600' : '\u263D';
});
</script>
```
