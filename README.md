# SLR Parser - Compiler Design Project

A comprehensive web-based implementation of a Simple LR (SLR) parser for arithmetic expressions, built as part of a Compiler Design course final project.

![SLR Parser Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue)

## 🎯 Project Overview

This project implements a complete SLR (Simple LR) parser that can parse arithmetic expressions according to the following augmented grammar:

```
E' → E
E → E + T | T
T → T * F | F
F → (E) | id
```

The parser successfully handles the target string `id*id+id$` and provides comprehensive visualizations of the parsing process.

## ✨ Features

### Core Functionality
- **Complete SLR Algorithm Implementation**
  - FIRST and FOLLOW set computation
  - LR(0) item generation and closure operations
  - Canonical collection construction
  - SLR parsing table generation
  - Step-by-step input parsing with trace

### Interactive Visualizations
- **SLR States and Closures Table** - Visual representation of all generated states
- **FIRST/FOLLOW Sets Table** - Computed sets for all non-terminals
- **SLR Parsing Table** - Complete ACTION and GOTO tables
- **Parse Tree Visualization** - Interactive tree with color-coded nodes and connections
- **Parsing Steps Display** - Detailed trace of parsing process

### User Interface
- **Modern Web Design** - Clean, professional interface built with React and Tailwind CSS
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Grammar Input** - Real-time grammar editing and validation
- **Educational Tooltips** - Comprehensive explanations and legends

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd slr-parser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## 📖 Usage Guide

### Basic Usage

1. **Grammar Input**: The default grammar is pre-loaded, but you can modify it in the text area
2. **Generate Tables**: Click "Generate Syntax Tables" to compute all SLR components
3. **Parse Input**: Enter a string like `id * id + id` and click "Display Parsing Sequence"
4. **Explore Results**: Navigate through the generated tables and visualizations

### Grammar Format

Enter grammar rules in the following format:
```
E' -> E
E -> E + T
E -> T
T -> T * F
T -> F
F -> ( E )
F -> id
```

- Use `->` to separate left and right sides of productions
- Use spaces to separate symbols
- Use `ε` for epsilon (empty) productions

### Example Inputs

**Valid Expressions:**
- `id`
- `id + id`
- `id * id`
- `id * id + id` (target string)
- `( id + id ) * id`

**Invalid Expressions:**
- `id +` (incomplete)
- `+ id` (starts with operator)
- `id id` (missing operator)

## 🏗️ Architecture

### Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Application header
│   ├── GrammarInput.tsx # Grammar input interface
│   ├── SLRTableClosure.tsx # States and closures display
│   ├── FirstFollowTable.tsx # FIRST/FOLLOW sets table
│   ├── SLRSyntaxTable.tsx # SLR parsing table
│   ├── ParseTree.tsx    # Parse tree visualization
│   ├── InputParser.tsx  # Input parsing interface
│   └── TeamSection.tsx  # Team information
├── utils/
│   └── slrParser.ts     # Core SLR algorithm implementation
├── types/
│   └── grammar.ts       # TypeScript type definitions
└── App.tsx              # Main application component
```

### Key Components

#### SLRParser Class (`src/utils/slrParser.ts`)
The core implementation containing:
- Grammar parsing and symbol extraction
- FIRST/FOLLOW set computation algorithms
- LR(0) item generation and closure operations
- Canonical collection construction
- SLR table generation
- Input string parsing with step-by-step trace

#### React Components
- **Modular Design**: Each component handles a specific aspect of the parser
- **Type Safety**: Full TypeScript integration with proper interfaces
- **Responsive UI**: Tailwind CSS for consistent, mobile-friendly design

## 🔬 Algorithm Details

### FIRST Set Computation
Implements the standard algorithm for computing FIRST sets:
1. Initialize FIRST sets for all symbols
2. Apply rules iteratively until no changes occur
3. Handle epsilon productions correctly

### FOLLOW Set Computation
Computes FOLLOW sets using:
1. Add $ to FOLLOW of start symbol
2. For each production A → αBβ, add FIRST(β) - {ε} to FOLLOW(B)
3. If ε ∈ FIRST(β) or β is empty, add FOLLOW(A) to FOLLOW(B)

### SLR Table Construction
1. Generate canonical collection of LR(0) item sets
2. Build ACTION table with shift/reduce/accept actions
3. Build GOTO table for non-terminal transitions
4. Use FOLLOW sets to resolve reduce actions

## 🧪 Testing

The implementation has been thoroughly tested with:

### Test Cases
- **Valid Grammar**: Default arithmetic expression grammar
- **Valid Inputs**: Various arithmetic expressions
- **Invalid Inputs**: Malformed expressions for error handling
- **Edge Cases**: Empty inputs, single tokens, nested parentheses

### Manual Testing
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design testing on multiple screen sizes
- Performance testing with complex grammars

## 📚 Educational Value

This project serves as an excellent educational tool for:

### Students
- **Visual Learning**: Interactive visualizations help understand abstract concepts
- **Step-by-Step Analysis**: Detailed parsing traces show algorithm execution
- **Hands-on Experience**: Ability to experiment with different grammars and inputs

### Instructors
- **Teaching Aid**: Ready-to-use tool for demonstrating SLR parsing
- **Customizable**: Easy to modify for different grammars or examples
- **Professional Quality**: Production-ready implementation suitable for academic use


## 📋 Requirements Met

✅ **Complete SLR Algorithm Implementation**  
✅ **Target Grammar Support** (Arithmetic Expressions)  
✅ **Successful Parsing** of "id*id+id$"  
✅ **Interactive Visualizations**  
✅ **Comprehensive Documentation**  
✅ **Modern Web Implementation**  
✅ **Educational Value**  
✅ **Production-Quality Code**


## 📜 License

This project is developed for educational purposes as part of a Compiler Design course. The code is available for academic use and learning.

