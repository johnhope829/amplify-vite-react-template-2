import React, { useState, useEffect } from 'react';
import './App.css';

const UpcomingShows = () => {
  const [shows, setShows] = useState([
    { 
      id: 1, 
      artist: 'The Lumineers', 
      venue: 'Red Rocks Amphitheatre', 
      date: '2024-07-15', 
      city: 'Morrison, CO' 
    },
    { 
      id: 2, 
      artist: 'Khruangbin', 
      venue: 'Greek Theatre', 
      date: '2024-08-22', 
      city: 'Berkeley, CA' 
    },
    { 
      id: 3, 
      artist: 'Leon Bridges', 
      venue: 'Stubb\'s Amphitheater', 
      date: '2024-09-05', 
      city: 'Austin, TX' 
    }
  ]);

  return (
    <div className="upcoming-shows-panel">
      <h2>Upcoming Shows</h2>
      <div className="shows-list">
        {shows.map(show => (
          <div key={show.id} className="show-card">
            <h3>{show.artist}</h3>
            <p>{show.venue}</p>
            <p>{show.city}</p>
            <p>{new Date(show.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PastShows = () => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [shows, setShows] = useState([
    { 
      id: 1, 
      artist: 'Bon Iver', 
      venue: 'Red Rocks Amphitheatre', 
      date: '2023-06-15', 
      city: 'Morrison, CO',
      metrics: {
        totalTicketsSold: 8500,
        revenue: 595000,
        averageTicketPrice: 70,
        socialMediaReach: 125000
      }
    },
    { 
      id: 2, 
      artist: 'The National', 
      venue: 'Greek Theatre', 
      date: '2023-07-22', 
      city: 'Berkeley, CA',
      metrics: {
        totalTicketsSold: 7200,
        revenue: 504000,
        averageTicketPrice: 70,
        socialMediaReach: 95000
      }
    }
  ]);

  const renderShowDetails = (show) => (
    <div className="show-details">
      <h2>{show.artist} - Show Report</h2>
      <div className="show-metrics">
        <div className="metric-card">
          <h3>Tickets Sold</h3>
          <p>{show.metrics.totalTicketsSold}</p>
        </div>
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <p>${show.metrics.revenue.toLocaleString()}</p>
        </div>
        <div className="metric-card">
          <h3>Avg. Ticket Price</h3>
          <p>${show.metrics.averageTicketPrice}</p>
        </div>
        <div className="metric-card">
          <h3>Social Media Reach</h3>
          <p>{show.metrics.socialMediaReach.toLocaleString()}</p>
        </div>
      </div>
      <button onClick={() => setSelectedShow(null)}>Back to Past Shows</button>
    </div>
  );

  return (
    <div className="past-shows-panel">
      {selectedShow ? (
        renderShowDetails(selectedShow)
      ) : (
        <>
          <h2>Past Shows</h2>
          <div className="shows-list">
            {shows.map(show => (
              <div 
                key={show.id} 
                className="show-card"
                onClick={() => setSelectedShow(show)}
              >
                <h3>{show.artist}</h3>
                <p>{show.venue}</p>
                <p>{show.city}</p>
                <p>{new Date(show.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [results, setResults] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState('Marketing Insights');
  const [view, setView] = useState('query'); // 'query', 'results', 'insights', 'history'
  const [isInfoPaneOpen, setIsInfoPaneOpen] = useState(false);
  const [schema, setSchema] = useState([
    { 
      name: 'users', 
      columns: ['id', 'name', 'email', 'created_at'] 
    },
    { 
      name: 'orders', 
      columns: ['id', 'user_id', 'amount', 'status', 'created_at'] 
    },
    { 
      name: 'products', 
      columns: ['id', 'name', 'price', 'category'] 
    }
  ]);

  // Mock function to generate SQL from natural language
  const generateSQL = async (text) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, generate a simple SQL query based on input
    let generatedSQL = '';
    
    if (text.toLowerCase().includes('user')) {
      generatedSQL = 'SELECT * FROM users LIMIT 10;';
    } else if (text.toLowerCase().includes('order')) {
      generatedSQL = 'SELECT * FROM orders WHERE status = "completed" LIMIT 10;';
    } else if (text.toLowerCase().includes('product')) {
      generatedSQL = 'SELECT * FROM products ORDER BY price DESC LIMIT 10;';
    } else {
      generatedSQL = 'SELECT * FROM users JOIN orders ON users.id = orders.user_id LIMIT 10;';
    }
    
    setSqlQuery(generatedSQL);
    setIsLoading(false);
    return generatedSQL;
  };

  // Mock function to execute SQL and get results
  const executeSQL = async (sql) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock results based on the SQL query
    let mockResults = [];
    
    if (sql.includes('users')) {
      mockResults = [
        { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2023-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2023-02-20' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', created_at: '2023-03-10' },
      ];
    } else if (sql.includes('orders')) {
      mockResults = [
        { id: 101, user_id: 1, amount: 99.99, status: 'completed', created_at: '2023-04-05' },
        { id: 102, user_id: 1, amount: 149.99, status: 'completed', created_at: '2023-05-12' },
        { id: 103, user_id: 2, amount: 79.99, status: 'pending', created_at: '2023-06-20' },
      ];
    } else if (sql.includes('products')) {
      mockResults = [
        { id: 201, name: 'Laptop', price: 1299.99, category: 'Electronics' },
        { id: 202, name: 'Smartphone', price: 899.99, category: 'Electronics' },
        { id: 203, name: 'Headphones', price: 199.99, category: 'Accessories' },
      ];
    } else {
      mockResults = [
        { id: 1, name: 'John Doe', order_id: 101, amount: 99.99, status: 'completed' },
        { id: 1, name: 'John Doe', order_id: 102, amount: 149.99, status: 'completed' },
        { id: 2, name: 'Jane Smith', order_id: 103, amount: 79.99, status: 'pending' },
      ];
    }
    
    setResults(mockResults);
    setIsLoading(false);
    return mockResults;
  };

  // Mock function to generate insights from results
  const generateInsights = async (data) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate insights based on data type
    let generatedInsights = [];
    
    if (data.length > 0 && data[0].hasOwnProperty('amount')) {
      const totalAmount = data.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
      const avgAmount = totalAmount / data.length;
      
      generatedInsights = [
        { type: 'summary', text: `Total orders: ${data.length}` },
        { type: 'metric', text: `Total revenue: $${totalAmount.toFixed(2)}` },
        { type: 'metric', text: `Average order value: $${avgAmount.toFixed(2)}` },
        { type: 'recommendation', text: 'Consider offering discounts to users with higher average order values to increase retention.' }
      ];
    } else if (data.length > 0 && data[0].hasOwnProperty('email')) {
      generatedInsights = [
        { type: 'summary', text: `Total users: ${data.length}` },
        { type: 'metric', text: `User acquisition rate: 15 users/month` },
        { type: 'recommendation', text: 'Send targeted emails to users who haven\'t ordered in the last 30 days.' }
      ];
    } else if (data.length > 0 && data[0].hasOwnProperty('price')) {
      const avgPrice = data.reduce((sum, item) => sum + parseFloat(item.price || 0), 0) / data.length;
      
      generatedInsights = [
        { type: 'summary', text: `Total products: ${data.length}` },
        { type: 'metric', text: `Average price: $${avgPrice.toFixed(2)}` },
        { type: 'recommendation', text: 'Consider bundling high-priced items with accessories for higher conversion rate.' }
      ];
    }
    
    setInsights(generatedInsights);
    setIsLoading(false);
    return generatedInsights;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const sql = await generateSQL(query);
    const data = await executeSQL(sql);
    await generateInsights(data);
    
    // Add to history
    setHistory([
      { query, sql, timestamp: new Date().toISOString() },
      ...history
    ]);
    
    // Switch to results view
    setView('results');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const renderQueryView = () => (
    <div className="query-panel">
      <h2>Marketing Analytics Agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <textarea
            className="query-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question (e.g., 'Show me all users who placed orders last month')"
            rows={4}
          />
          <button type="submit" className="primary-button">
            {isLoading ? 'Processing...' : 'Generate Results'}
          </button>
        </div>
      </form>
      
      <div className="schema-explorer">
        <h3>Database Schema</h3>
        <div className="schema-tables">
          {schema.map((table) => (
            <div key={table.name} className="schema-table">
              <h4>{table.name}</h4>
              <ul>
                {table.columns.map((column) => (
                  <li key={column}>{column}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResultsView = () => (
    <div className="results-panel">
      <div className="panel-header">
        <h2>Results</h2>
        <div className="view-controls">
          <button 
            className="view-button" 
            onClick={() => setView('query')}
          >
            Back to Query
          </button>
          <button 
            className="view-button" 
            onClick={() => setView('insights')}
          >
            View Insights
          </button>
        </div>
      </div>
      
      <div className="sql-display">
        <div className="sql-header">
          <h3>Generated SQL</h3>
          <button 
            className="icon-button" 
            onClick={() => handleCopy(sqlQuery)}
            title="Copy SQL"
          >
            Copy
          </button>
        </div>
        <pre>{sqlQuery}</pre>
      </div>
      
      <div className="results-table">
        {results.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((value, j) => (
                    <td key={j}>{value?.toString()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results to display</p>
        )}
      </div>
    </div>
  );

  const renderInsightsView = () => (
    <div className="insights-panel">
      <div className="panel-header">
        <h2>Data Insights</h2>
        <div className="view-controls">
          <button 
            className="view-button" 
            onClick={() => setView('results')}
          >
            Back to Results
          </button>
        </div>
      </div>
      
      <div className="insights-container">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className={`insight-card ${insight.type}`}
          >
            <div className="insight-icon">
              {insight.type === 'summary' && '📊'}
              {insight.type === 'metric' && '📈'}
              {insight.type === 'recommendation' && '💡'}
            </div>
            <p>{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistoryView = () => (
    <div className="history-panel">
      <div className="panel-header">
        <h2>Query History</h2>
        <button 
          className="view-button" 
          onClick={() => setView('query')}
        >
          Back to Query
        </button>
      </div>
      
      <div className="history-list">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-item-header">
                <span className="history-timestamp">{new Date(item.timestamp).toLocaleString()}</span>
                <div className="history-actions">
                  <button 
                    className="icon-button"
                    onClick={() => {
                      setQuery(item.query);
                      setSqlQuery(item.sql);
                      setView('query');
                    }}
                    title="Load Query"
                  >
                    Load
                  </button>
                </div>
              </div>
              <p className="history-query">{item.query}</p>
              <pre className="history-sql">{item.sql}</pre>
            </div>
          ))
        ) : (
          <p>No query history yet</p>
        )}
      </div>
    </div>
  );  

  // Render function based on current page
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'Marketing Insights':
        return (
          <>
            {view === 'query' && renderQueryView()}
            {view === 'results' && renderResultsView()}
            {view === 'insights' && renderInsightsView()}
            {view === 'history' && renderHistoryView()}
          </>
        );
      case 'Upcoming Shows':
        return <UpcomingShows />;
      case 'Past Shows':
        return <PastShows />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">
          <img src="/rlm.png" alt="RLM Marketing" className="app-icon" />
        </div>
        <nav className="main-nav">
          {currentPage === 'Marketing Insights' && (
            <>
              <button 
                className={`nav-button ${view === 'query' ? 'active' : ''}`}
                onClick={() => setView('query')}
              >
                Query
              </button>
              <button 
                className={`nav-button ${view === 'results' ? 'active' : ''}`}
                onClick={() => setView('results')}
                disabled={results.length === 0}
              >
                Results
              </button>
              <button 
                className={`nav-button ${view === 'insights' ? 'active' : ''}`}
                onClick={() => setView('insights')}
                disabled={insights.length === 0}
              >
                Insights
              </button>
              <button 
                className={`nav-button ${view === 'history' ? 'active' : ''}`}
                onClick={() => setView('history')}
              >
                History
              </button>
            </>
          )}
          <button 
            className={`nav-button ${isInfoPaneOpen ? 'active' : ''}`}
            onClick={() => setIsInfoPaneOpen(!isInfoPaneOpen)}
          >
            Info
          </button>
        </nav>
        <button className="sign-in-button">Sign In</button>
      </header>
      <div className="app-content-container">
        <div className="side-nav">
          <button 
            className={`side-nav-button ${currentPage === 'Marketing Insights' ? 'active' : ''}`}
            onClick={() => setCurrentPage('Marketing Insights')}
          >
            Marketing Insights
          </button>
          <button 
            className={`side-nav-button ${currentPage === 'Upcoming Shows' ? 'active' : ''}`}
            onClick={() => setCurrentPage('Upcoming Shows')}
          >
            Upcoming Shows
          </button>
          <button 
            className={`side-nav-button ${currentPage === 'Past Shows' ? 'active' : ''}`}
            onClick={() => setCurrentPage('Past Shows')}
          >
            Past Shows
          </button>
        </div>
        
        <main className="app-content">
          {renderCurrentPage()}
        </main>
      </div>
      
      <footer className="app-footer">
        <p>Red Light Management - Marketing AI Agent</p>
      </footer>

      {isInfoPaneOpen && (
        <div className="info-pane">
          <div className="info-pane-content">
            <div className="info-pane-header">
              <h2>About SQLWhisperer</h2>
              <button 
                className="close-button"
                onClick={() => setIsInfoPaneOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="info-pane-body">
              <section className="info-section">
                <h3>What is SQLWhisperer?</h3>
                <p>SQLWhisperer is an AI-powered tool that converts natural language queries into SQL code. Simply describe what data you want to see, and SQLWhisperer will generate the appropriate SQL query.</p>
              </section>

              <section className="info-section">
                <h3>How It Works</h3>
                <ol>
                  <li>Enter your question in plain English</li>
                  <li>SQLWhisperer translates your request into SQL</li>
                  <li>Review and run the generated SQL</li>
                  <li>Explore results and insights</li>
                </ol>
              </section>

              <section className="info-section">
                <h3>Tips for Better Results</h3>
                <ul>
                  <li>Be specific about what tables and columns you want to query</li>
                  <li>Mention any filters or conditions clearly</li>
                  <li>Specify how you want data sorted or grouped</li>
                  <li>Use database terminology when possible</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
    )}       
    </div>
  );
};

export default App;