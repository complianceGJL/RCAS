// SHIELD Taxonomy Data
const SHIELD_DATA = {
  "acts": {
    "description": "Direct actions, omissions, or intentional deviations from procedures that impact safety",
    "categories": {
      "perception": {
        "name": "Perception",
        "factors": ["Visual perception issue", "Auditory perception issue", "Kinesthetic perception issue", "Other sensory perception issue"]
      },
      "planning_decision": {
        "name": "Planning & Decision Making", 
        "factors": ["Information interpretation issue", "Decision timing problem", "Plan formulation error"]
      },
      "response_execution": {
        "name": "Response Execution",
        "factors": ["Action execution error", "Timing issue", "Coordination problem"]
      },
      "communication": {
        "name": "Communication",
        "factors": ["Verbal communication issue", "Non-verbal communication issue", "Written communication issue", "Electronic communication issue"]
      },
      "intentional_deviation": {
        "name": "Intentional Deviation",
        "factors": ["Procedure violation", "Rule violation", "Standard violation", "Policy violation", "Safety measure bypass"]
      }
    }
  },
  "preconditions": {
    "description": "Environmental factors or conditions affecting human performance",
    "categories": {
      "physical_environment": {
        "name": "Physical Environment",
        "factors": ["Poor visibility", "Excessive noise", "Vibration", "Extreme temperature", "Bad weather", "Lighting issues", "Workspace congestion", "Hazardous conditions", "Acceleration effects"]
      },
      "equipment_workplace": {
        "name": "Equipment & Workplace",
        "factors": ["Poor equipment design", "Equipment unavailability", "Equipment malfunction", "Poor ergonomics", "Inadequate tools", "Interface design issues"]
      },
      "mental_workload": {
        "name": "Mental Workload",
        "factors": ["High workload", "Low workload", "Information processing overload", "Startle effect"]
      },
      "personal_factors": {
        "name": "Personal Factors",
        "factors": ["Poor emotional state", "Personality conflict", "Low motivation", "Performance pressure", "Psychological condition", "Low confidence", "Complacency"]
      },
      "physiological_condition": {
        "name": "Physiological Condition",
        "factors": ["Fatigue", "Illness", "Injury", "Substance effects", "Physical impairment"]
      },
      "drugs_nutrition": {
        "name": "Drugs & Nutrition",
        "factors": ["Alcohol effects", "Medication effects", "Poor nutrition"]
      },
      "competence_skills": {
        "name": "Competence & Skills",
        "factors": ["Insufficient experience", "Inadequate training", "Low proficiency", "Physical capability limitation"]
      }
    }
  },
  "operational_leadership": {
    "description": "Decisions or policies of operations leaders affecting practices and conditions",
    "categories": {
      "personnel_leadership": {
        "name": "Personnel Leadership",
        "factors": ["Inadequate leadership", "Poor feedback system", "Lack of role modeling", "Personality conflicts"]
      },
      "operations_planning": {
        "name": "Operations Planning", 
        "factors": ["Inadequate risk assessment", "Poor team composition", "Excessive pressure", "Inadequate qualifications", "Equipment inadequacy", "Poor scheduling"]
      },
      "task_leadership": {
        "name": "Task Leadership",
        "factors": ["No safety enforcement", "Poor rule compliance", "Unauthorized deviations", "Inadequate supervision", "Poor task allocation"]
      }
    }
  },
  "organisation": {
    "description": "Organizational-level decisions, policies, or methods affecting operations", 
    "categories": {
      "culture": {
        "name": "Culture",
        "factors": ["Poor safety culture", "Cultural barriers"]
      },
      "safety_management": {
        "name": "Safety Management",
        "factors": ["Poor safety structure", "Inadequate risk management", "Poor procedures", "Inadequate training programs", "Lack of safety promotion"]
      },
      "resources": {
        "name": "Resources",
        "factors": ["Personnel shortage", "Budget constraints", "Equipment inadequacy", "Poor information systems", "Inadequate design support", "Lack of operational support"]
      },
      "economy_business": {
        "name": "Economy & Business",
        "factors": ["Strong competition", "Poor contractor relations", "Economic pressure", "Business constraints"]
      }
    }
  }
};

// Application State
let analysisData = {
  incident: {
    description: '',
    date: '',
    type: '',
    domain: ''
  },
  factors: {},
  customFactors: {}
};

let currentLayer = null;
let currentFactorForModal = null;

// DOM Elements
const layerElements = document.querySelectorAll('.pyramid-layer');
const analysisPanel = document.getElementById('analysis-panel');
const panelTitle = document.getElementById('panel-title');
const panelContent = document.getElementById('panel-content');
const factorModal = document.getElementById('factor-modal');
const summarySection = document.getElementById('summary-section');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  loadIncidentData();
});

function initializeEventListeners() {
  // Layer selection
  layerElements.forEach(layer => {
    layer.addEventListener('click', () => selectLayer(layer.dataset.layer));
  });

  // Panel controls
  document.getElementById('close-panel').addEventListener('click', closePanel);

  // Modal controls
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.getElementById('cancel-factor').addEventListener('click', closeModal);
  document.getElementById('save-factor').addEventListener('click', saveFactor);

  // Analysis controls
  document.getElementById('clear-analysis').addEventListener('click', clearAnalysis);
  document.getElementById('save-analysis').addEventListener('click', saveAnalysis);
  document.getElementById('load-analysis').addEventListener('click', () => {
    document.getElementById('load-file').click();
  });
  document.getElementById('load-file').addEventListener('change', loadAnalysis);

  // Summary controls
  document.getElementById('export-summary').addEventListener('click', exportSummary);
  document.getElementById('print-summary').addEventListener('click', () => window.print());

  // Incident form changes
  const incidentInputs = ['incident-description', 'incident-date', 'incident-type', 'incident-domain'];
  incidentInputs.forEach(id => {
    document.getElementById(id).addEventListener('change', saveIncidentData);
  });
}

function selectLayer(layerName) {
  currentLayer = layerName;
  
  // Update UI
  layerElements.forEach(el => el.classList.remove('active'));
  document.getElementById(`layer-${layerName.replace('_', '-')}`).classList.add('active');
  
  // Update panel
  updateAnalysisPanel(layerName);
  updateSummary();
}

function updateAnalysisPanel(layerName) {
  const layerData = SHIELD_DATA[layerName];
  panelTitle.textContent = `${layerName.toUpperCase().replace('_', ' ')} Layer Analysis`;
  
  let content = `
    <div class="layer-description">
      <p><strong>Description:</strong> ${layerData.description}</p>
    </div>
  `;
  
  // Add categories
  Object.entries(layerData.categories).forEach(([categoryKey, categoryData]) => {
    content += createCategorySection(layerName, categoryKey, categoryData);
  });
  
  panelContent.innerHTML = content;
  
  // Add event listeners for categories
  attachCategoryListeners(layerName);
}

function createCategorySection(layerName, categoryKey, categoryData) {
  const isExpanded = false; // Could be saved in state
  const selectedFactors = getSelectedFactors(layerName, categoryKey);
  
  return `
    <div class="category-section ${isExpanded ? 'expanded' : ''}" data-category="${categoryKey}">
      <div class="category-header">
        <h4>${categoryData.name}</h4>
        <span class="category-toggle">▼</span>
      </div>
      <div class="category-content">
        <div class="factor-list">
          ${categoryData.factors.map(factor => 
            createFactorItem(layerName, categoryKey, factor, selectedFactors.includes(factor))
          ).join('')}
        </div>
        <div class="custom-factor">
          <button class="btn btn--outline btn--sm" onclick="addCustomFactor('${layerName}', '${categoryKey}')">
            Add Custom Factor
          </button>
          <div class="custom-factor-input" id="custom-input-${layerName}-${categoryKey}" style="display: none;">
            <input type="text" class="form-control" placeholder="Enter custom factor..." 
                   id="custom-text-${layerName}-${categoryKey}">
            <button class="btn btn--primary btn--sm" onclick="saveCustomFactor('${layerName}', '${categoryKey}')">Add</button>
            <button class="btn btn--secondary btn--sm" onclick="cancelCustomFactor('${layerName}', '${categoryKey}')">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createFactorItem(layerName, categoryKey, factor, isSelected) {
  const factorId = `${layerName}-${categoryKey}-${factor.replace(/\s+/g, '-').toLowerCase()}`;
  return `
    <div class="factor-item ${isSelected ? 'selected' : ''}" data-factor="${factor}">
      <input type="checkbox" class="factor-checkbox" id="${factorId}" 
             ${isSelected ? 'checked' : ''} onchange="toggleFactor('${layerName}', '${categoryKey}', '${factor}')">
      <label class="factor-label" for="${factorId}">${factor}</label>
      <button class="btn btn--outline btn--sm factor-details-btn" 
              onclick="openFactorDetails('${layerName}', '${categoryKey}', '${factor}')">
        Details
      </button>
    </div>
  `;
}

function attachCategoryListeners(layerName) {
  const categoryHeaders = panelContent.querySelectorAll('.category-header');
  categoryHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const categorySection = header.parentNode;
      categorySection.classList.toggle('expanded');
    });
  });
}

function getSelectedFactors(layerName, categoryKey) {
  const key = `${layerName}.${categoryKey}`;
  return analysisData.factors[key] ? Object.keys(analysisData.factors[key]) : [];
}

function toggleFactor(layerName, categoryKey, factor) {
  const key = `${layerName}.${categoryKey}`;
  
  if (!analysisData.factors[key]) {
    analysisData.factors[key] = {};
  }
  
  if (analysisData.factors[key][factor]) {
    delete analysisData.factors[key][factor];
    if (Object.keys(analysisData.factors[key]).length === 0) {
      delete analysisData.factors[key];
    }
  } else {
    analysisData.factors[key][factor] = {
      description: '',
      severity: '3',
      evidence: '',
      actions: ''
    };
  }
  
  updateFactorCounts();
  updateSummary();
  
  // Update UI
  const factorItem = document.querySelector(`[data-factor="${factor}"]`);
  if (factorItem) {
    factorItem.classList.toggle('selected');
  }
}

function openFactorDetails(layerName, categoryKey, factor) {
  currentFactorForModal = { layerName, categoryKey, factor };
  
  const key = `${layerName}.${categoryKey}`;
  const factorData = analysisData.factors[key]?.[factor] || {
    description: '',
    severity: '3',
    evidence: '',
    actions: ''
  };
  
  // Ensure factor exists in analysis
  if (!analysisData.factors[key]) {
    analysisData.factors[key] = {};
  }
  if (!analysisData.factors[key][factor]) {
    analysisData.factors[key][factor] = factorData;
    updateFactorCounts();
  }
  
  document.getElementById('modal-title').textContent = `Factor Details: ${factor}`;
  document.getElementById('factor-description').value = factorData.description;
  document.getElementById('factor-severity').value = factorData.severity;
  document.getElementById('factor-evidence').value = factorData.evidence;
  document.getElementById('factor-actions').value = factorData.actions;
  
  factorModal.style.display = 'flex';
}

function saveFactor() {
  if (!currentFactorForModal) return;
  
  const { layerName, categoryKey, factor } = currentFactorForModal;
  const key = `${layerName}.${categoryKey}`;
  
  if (!analysisData.factors[key]) {
    analysisData.factors[key] = {};
  }
  
  analysisData.factors[key][factor] = {
    description: document.getElementById('factor-description').value,
    severity: document.getElementById('factor-severity').value,
    evidence: document.getElementById('factor-evidence').value,
    actions: document.getElementById('factor-actions').value
  };
  
  closeModal();
  updateSummary();
  
  // Update checkbox if not already selected
  const factorItem = document.querySelector(`[data-factor="${factor}"]`);
  if (factorItem && !factorItem.classList.contains('selected')) {
    const checkbox = factorItem.querySelector('.factor-checkbox');
    if (checkbox) {
      checkbox.checked = true;
      factorItem.classList.add('selected');
    }
  }
}

function closeModal() {
  factorModal.style.display = 'none';
  currentFactorForModal = null;
}

function addCustomFactor(layerName, categoryKey) {
  const inputDiv = document.getElementById(`custom-input-${layerName}-${categoryKey}`);
  inputDiv.style.display = 'flex';
  document.getElementById(`custom-text-${layerName}-${categoryKey}`).focus();
}

function saveCustomFactor(layerName, categoryKey) {
  const input = document.getElementById(`custom-text-${layerName}-${categoryKey}`);
  const factorName = input.value.trim();
  
  if (!factorName) return;
  
  // Add to custom factors
  const customKey = `${layerName}.${categoryKey}`;
  if (!analysisData.customFactors[customKey]) {
    analysisData.customFactors[customKey] = [];
  }
  analysisData.customFactors[customKey].push(factorName);
  
  // Add to selected factors
  const key = `${layerName}.${categoryKey}`;
  if (!analysisData.factors[key]) {
    analysisData.factors[key] = {};
  }
  analysisData.factors[key][factorName] = {
    description: '',
    severity: '3',
    evidence: '',
    actions: '',
    custom: true
  };
  
  input.value = '';
  cancelCustomFactor(layerName, categoryKey);
  updateAnalysisPanel(layerName);
  updateFactorCounts();
  updateSummary();
}

function cancelCustomFactor(layerName, categoryKey) {
  const inputDiv = document.getElementById(`custom-input-${layerName}-${categoryKey}`);
  inputDiv.style.display = 'none';
  document.getElementById(`custom-text-${layerName}-${categoryKey}`).value = '';
}

function updateFactorCounts() {
  Object.keys(SHIELD_DATA).forEach(layerName => {
    const count = getTotalFactorsForLayer(layerName);
    const countElement = document.getElementById(`${layerName.replace('_', '-')}-count`);
    if (countElement) {
      countElement.textContent = `${count} factor${count !== 1 ? 's' : ''}`;
    }
  });
}

function getTotalFactorsForLayer(layerName) {
  let count = 0;
  Object.keys(analysisData.factors).forEach(key => {
    if (key.startsWith(layerName + '.')) {
      count += Object.keys(analysisData.factors[key]).length;
    }
  });
  return count;
}

function updateSummary() {
  const totalFactors = Object.values(analysisData.factors).reduce((total, category) => 
    total + Object.keys(category).length, 0);
  
  if (totalFactors > 0) {
    summarySection.style.display = 'block';
    generateSummaryContent();
  } else {
    summarySection.style.display = 'none';
  }
}

function generateSummaryContent() {
  const stats = document.getElementById('summary-stats');
  const details = document.getElementById('summary-details');
  
  // Generate statistics
  const layerCounts = {};
  let totalFactors = 0;
  let highSeverityFactors = 0;
  
  Object.entries(analysisData.factors).forEach(([key, factors]) => {
    const layerName = key.split('.')[0];
    layerCounts[layerName] = (layerCounts[layerName] || 0) + Object.keys(factors).length;
    totalFactors += Object.keys(factors).length;
    
    Object.values(factors).forEach(factor => {
      if (parseInt(factor.severity) >= 4) {
        highSeverityFactors++;
      }
    });
  });
  
  stats.innerHTML = `
    <div class="stat-card">
      <span class="stat-number">${totalFactors}</span>
      <span class="stat-label">Total Factors</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">${Object.keys(layerCounts).length}</span>
      <span class="stat-label">Layers Involved</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">${highSeverityFactors}</span>
      <span class="stat-label">High Severity Factors</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">${Math.round((highSeverityFactors / totalFactors) * 100) || 0}%</span>
      <span class="stat-label">High Severity Ratio</span>
    </div>
  `;
  
  // Generate detailed breakdown
  let detailsHTML = '';
  Object.keys(SHIELD_DATA).forEach(layerName => {
    const layerFactors = getFactorsForLayer(layerName);
    if (Object.keys(layerFactors).length > 0) {
      detailsHTML += generateLayerSummary(layerName, layerFactors);
    }
  });
  
  details.innerHTML = detailsHTML;
}

function getFactorsForLayer(layerName) {
  const result = {};
  Object.entries(analysisData.factors).forEach(([key, factors]) => {
    if (key.startsWith(layerName + '.')) {
      const categoryKey = key.split('.')[1];
      result[categoryKey] = factors;
    }
  });
  return result;
}

function generateLayerSummary(layerName, layerFactors) {
  const layerTitle = layerName.toUpperCase().replace('_', ' ');
  let html = `<div class="summary-layer">
    <h3>${layerTitle} Layer</h3>`;
  
  Object.entries(layerFactors).forEach(([categoryKey, factors]) => {
    const categoryName = SHIELD_DATA[layerName].categories[categoryKey].name;
    html += `<div class="summary-category">
      <h4>${categoryName}</h4>
      <div class="summary-factors">`;
    
    Object.entries(factors).forEach(([factorName, factorData]) => {
      html += `<div class="summary-factor">
        <div class="factor-name">${factorName}</div>
        <span class="factor-severity severity-${factorData.severity}">
          Severity ${factorData.severity}
        </span>
        ${factorData.description ? `<div class="factor-description">${factorData.description}</div>` : ''}
        ${factorData.actions ? `<div class="factor-actions"><strong>Actions:</strong> ${factorData.actions}</div>` : ''}
      </div>`;
    });
    
    html += `</div></div>`;
  });
  
  html += `</div>`;
  return html;
}

function closePanel() {
  layerElements.forEach(el => el.classList.remove('active'));
  panelTitle.textContent = 'Select a layer to begin analysis';
  panelContent.innerHTML = '<p class="panel-instruction">Click on a layer in the SHIELD pyramid to start analyzing factors.</p>';
  currentLayer = null;
}

function saveIncidentData() {
  analysisData.incident = {
    description: document.getElementById('incident-description').value,
    date: document.getElementById('incident-date').value,
    type: document.getElementById('incident-type').value,
    domain: document.getElementById('incident-domain').value
  };
}

function loadIncidentData() {
  document.getElementById('incident-description').value = analysisData.incident.description || '';
  document.getElementById('incident-date').value = analysisData.incident.date || '';
  document.getElementById('incident-type').value = analysisData.incident.type || '';
  document.getElementById('incident-domain').value = analysisData.incident.domain || '';
}

function clearAnalysis() {
  if (confirm('Are you sure you want to clear all analysis data? This action cannot be undone.')) {
    analysisData = {
      incident: { description: '', date: '', type: '', domain: '' },
      factors: {},
      customFactors: {}
    };
    loadIncidentData();
    updateFactorCounts();
    updateSummary();
    closePanel();
  }
}

function saveAnalysis() {
  const dataStr = JSON.stringify(analysisData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `shield-analysis-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
}

function loadAnalysis(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const loadedData = JSON.parse(e.target.result);
      analysisData = loadedData;
      loadIncidentData();
      updateFactorCounts();
      updateSummary();
      closePanel();
      alert('Analysis loaded successfully!');
    } catch (error) {
      alert('Error loading analysis file. Please check the file format.');
    }
  };
  reader.readAsText(file);
  
  // Reset file input
  event.target.value = '';
}

function exportSummary() {
  saveIncidentData();
  
  let report = 'SHIELD ROOT CAUSE ANALYSIS REPORT\n';
  report += '=====================================\n\n';
  
  // Incident details
  report += 'INCIDENT DETAILS\n';
  report += '----------------\n';
  report += `Description: ${analysisData.incident.description}\n`;
  report += `Date/Time: ${analysisData.incident.date}\n`;
  report += `Type: ${analysisData.incident.type}\n`;
  report += `Domain: ${analysisData.incident.domain}\n\n`;
  
  // Analysis summary
  const totalFactors = Object.values(analysisData.factors).reduce((total, category) => 
    total + Object.keys(category).length, 0);
  
  report += 'ANALYSIS SUMMARY\n';
  report += '----------------\n';
  report += `Total Factors Identified: ${totalFactors}\n\n`;
  
  // Layer breakdown
  Object.keys(SHIELD_DATA).forEach(layerName => {
    const layerFactors = getFactorsForLayer(layerName);
    if (Object.keys(layerFactors).length > 0) {
      report += `${layerName.toUpperCase().replace('_', ' ')} LAYER\n`;
      report += '-'.repeat(layerName.length + 6) + '\n';
      
      Object.entries(layerFactors).forEach(([categoryKey, factors]) => {
        const categoryName = SHIELD_DATA[layerName].categories[categoryKey].name;
        report += `\n${categoryName}:\n`;
        
        Object.entries(factors).forEach(([factorName, factorData]) => {
          report += `  • ${factorName} (Severity: ${factorData.severity})\n`;
          if (factorData.description) {
            report += `    Description: ${factorData.description}\n`;
          }
          if (factorData.actions) {
            report += `    Recommended Actions: ${factorData.actions}\n`;
          }
        });
      });
      report += '\n';
    }
  });
  
  // Export as text file
  const dataBlob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `shield-report-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  
  URL.revokeObjectURL(url);
}

// Initialize factor counts on load
updateFactorCounts();