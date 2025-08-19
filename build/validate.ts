#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ValidationResult = {
  file: string;
  errors: string[];
  warnings: string[];
};

function validateHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

function validateColorReference(ref: string, context: string): string[] {
  const errors: string[] = [];
  
  if (!ref || typeof ref !== 'string') {
    errors.push(`${context}: Invalid color reference type: ${typeof ref}`);
    return errors;
  }
  
  if (ref.startsWith('#')) {
    if (!validateHexColor(ref)) {
      errors.push(`${context}: Invalid hex color format: '${ref}'`);
    }
  } else {
    const parts = ref.split('.');
    if (parts.length < 2) {
      errors.push(`${context}: Invalid reference format: '${ref}'. Expected 'category.property'`);
    }
  }
  
  return errors;
}

function validateJSON(filePath: string, validator: (data: any) => ValidationResult): ValidationResult {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    return validator(data);
  } catch (error) {
    return {
      file: path.basename(filePath),
      errors: [`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`],
      warnings: []
    };
  }
}

function validatePalette(data: any): ValidationResult {
  const result: ValidationResult = {
    file: 'palette.json',
    errors: [],
    warnings: []
  };
  
  // Check required structure
  const requiredSections = ['base', 'ansi', 'bright', 'ui'];
  for (const section of requiredSections) {
    if (!data[section] || typeof data[section] !== 'object') {
      result.errors.push(`Missing or invalid section: ${section}`);
      continue;
    }
    
    // Validate colors in each section
    for (const [key, value] of Object.entries(data[section])) {
      const errors = validateColorReference(value as string, `${section}.${key}`);
      result.errors.push(...errors);
    }
  }
  
  return result;
}

function validateSemantic(data: any): ValidationResult {
  const result: ValidationResult = {
    file: 'semantic.json',
    errors: [],
    warnings: []
  };
  
  // Check required sections
  const requiredSections = ['syntax', 'typescript', 'jsx', 'editor', 'ui_elements', 'diagnostics'];
  for (const section of requiredSections) {
    if (!data[section] || typeof data[section] !== 'object') {
      result.errors.push(`Missing or invalid section: ${section}`);
      continue;
    }
    
    // Validate semantic references
    for (const [key, value] of Object.entries(data[section])) {
      const errors = validateColorReference(value as string, `${section}.${key}`);
      result.errors.push(...errors);
    }
  }
  
  return result;
}

function validateVSCodeTokens(data: any): ValidationResult {
  const result: ValidationResult = {
    file: 'vscode-tokens.json',
    errors: [],
    warnings: []
  };
  
  if (!data.token_groups || typeof data.token_groups !== 'object') {
    result.errors.push('Missing or invalid token_groups section');
    return result;
  }
  
  for (const [groupName, groupData] of Object.entries(data.token_groups)) {
    const group = groupData as any;
    
    if (!group.description || typeof group.description !== 'string') {
      result.errors.push(`${groupName}: Missing or invalid description`);
    }
    
    if (!Array.isArray(group.tokens)) {
      result.errors.push(`${groupName}: Missing or invalid tokens array`);
    } else if (group.tokens.length === 0) {
      result.warnings.push(`${groupName}: Empty tokens array`);
    }
  }
  
  return result;
}

function validateColorAssignments(data: any): ValidationResult {
  const result: ValidationResult = {
    file: 'color-assignments.json',
    errors: [],
    warnings: []
  };
  
  // Validate semantic roles
  if (!data.semantic_roles || typeof data.semantic_roles !== 'object') {
    result.errors.push('Missing or invalid semantic_roles section');
  } else {
    for (const [roleName, roleData] of Object.entries(data.semantic_roles)) {
      const role = roleData as any;
      if (!role.palette_ref || typeof role.palette_ref !== 'string') {
        result.errors.push(`semantic_roles.${roleName}: Missing or invalid palette_ref`);
      }
    }
  }
  
  // Validate assignments
  if (!data.assignments || typeof data.assignments !== 'object') {
    result.errors.push('Missing or invalid assignments section');
  }
  
  // Validate alternative assignments
  if (data.alternative_assignments && typeof data.alternative_assignments === 'object') {
    for (const [variantName, variantData] of Object.entries(data.alternative_assignments)) {
      const variant = variantData as any;
      if (!variant.assignments || typeof variant.assignments !== 'object') {
        result.errors.push(`alternative_assignments.${variantName}: Missing or invalid assignments`);
      }
    }
  }
  
  return result;
}

// Main validation
console.log('Validating JSON configuration files...\n');

const colorDir = path.join(__dirname, '../colors');
const files = [
  { path: path.join(colorDir, 'palette.json'), validator: validatePalette },
  { path: path.join(colorDir, 'semantic.json'), validator: validateSemantic },
  { path: path.join(colorDir, 'vscode-tokens.json'), validator: validateVSCodeTokens },
  { path: path.join(colorDir, 'color-assignments.json'), validator: validateColorAssignments }
];

let totalErrors = 0;
let totalWarnings = 0;

for (const file of files) {
  const result = validateJSON(file.path, file.validator);
  
  console.log(`📁 ${result.file}`);
  
  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log('  ✅ Valid\n');
  } else {
    if (result.errors.length > 0) {
      console.log(`  ❌ ${result.errors.length} error(s):`);
      result.errors.forEach(error => console.log(`    • ${error}`));
      totalErrors += result.errors.length;
    }
    
    if (result.warnings.length > 0) {
      console.log(`  ⚠️  ${result.warnings.length} warning(s):`);
      result.warnings.forEach(warning => console.log(`    • ${warning}`));
      totalWarnings += result.warnings.length;
    }
    console.log();
  }
}

console.log(`📊 Summary: ${totalErrors} errors, ${totalWarnings} warnings`);

if (totalErrors > 0) {
  console.log('\n❌ Validation failed! Please fix the errors above.');
  process.exit(1);
} else {
  console.log('\n✅ All JSON files are valid!');
}