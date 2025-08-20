import React from 'react';

// Custom component
const CustomButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

// Another custom component
function UserProfile({ name, email }) {
  return (
    <div className="profile">
      <h1>{name}</h1>
      <span>{email}</span>
    </div>
  );
}

// Main component with mixed JSX elements
export default function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <main className="app">
      {/* HTML elements - should be light blue (bright.cyan #60b6cb) */}
      <div className="container">
        <header>
          <h1>Welcome to React</h1>
          <p>This is a test component</p>
        </header>
        
        <section className="content">
          <UserProfile name="John Doe" email="john@example.com" />
          
          <div className="actions">
            <CustomButton onClick={handleClick}>
              Click Me
            </CustomButton>
            
            <div>
              <CustomButton onClick={() => console.log('Another click')}>
                <span>Button with nested HTML</span>
              </CustomButton>
            </div>
          </div>
        </section>
        
        {/* More HTML elements */}
        <footer>
          <p>© 2025 Example Corp</p>
          <nav>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </footer>
      </div>
    </main>
  );
}