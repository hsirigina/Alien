import { ProcessStep, ScrapedInformation, StepStatus } from '../types/immigration';
import { WebSearchService } from './WebSearchService';

export class InformationGatherer {
  private webSearchService: WebSearchService;

  constructor() {
    this.webSearchService = new WebSearchService();
  }

  private generateSearchQueries(institution: string, program: string, visaType: string, state: string): string[] {
    return [
      `${institution} ${visaType} visa requirements international students`,
      `${institution} ${program} international student application process`,
      `${visaType} visa application process ${state} timeline`,
      `${visaType} visa required documents checklist`,
      `${institution} international office contact ${visaType}`,
    ];
  }

  private async searchWeb(queries: string[]): Promise<any[]> {
    return this.webSearchService.searchMultipleQueries(queries);
  }

  private extractInformation(searchResults: any[]): ScrapedInformation {
    const info: ScrapedInformation = {
      requirements: [],
      deadlines: [],
      contacts: [],
      processSteps: []
    };

    for (const result of searchResults) {
      const snippet = result.snippet.toLowerCase();
      
      // Extract requirements
      if (snippet.includes('required') || snippet.includes('requirements')) {
        const requirements: string[] = snippet
          .split(/[.,;]/)
          .filter((s: string) => s.includes('require'))
          .map((s: string) => s.trim());
        info.requirements.push(...requirements);
      }

      // Extract deadlines
      if (snippet.includes('deadline') || snippet.includes('timeline') || snippet.includes('date')) {
        const deadlines: string[] = snippet
          .split(/[.,;]/)
          .filter((s: string) => s.includes('deadline') || s.includes('by') || s.includes('before'))
          .map((s: string) => s.trim());
        info.deadlines.push(...deadlines);
      }

      // Extract contacts
      if (snippet.includes('contact') || snippet.includes('office') || snippet.includes('email')) {
        const contacts: string[] = snippet
          .split(/[.,;]/)
          .filter((s: string) => s.includes('contact') || s.includes('office'))
          .map((s: string) => s.trim());
        info.contacts.push(...contacts);
      }

      // Extract process steps
      if (snippet.includes('step') || snippet.includes('process')) {
        const steps: string[] = snippet
          .split(/[.,;]/)
          .filter((s: string) => s.includes('step') || s.includes('must') || s.includes('need to'))
          .map((s: string) => s.trim());
        info.processSteps.push(...steps);
      }
    }

    // Remove duplicates and empty strings
    info.requirements = [...new Set(info.requirements)].filter(Boolean);
    info.deadlines = [...new Set(info.deadlines)].filter(Boolean);
    info.contacts = [...new Set(info.contacts)].filter(Boolean);
    info.processSteps = [...new Set(info.processSteps)].filter(Boolean);

    return info;
  }

  private validateInformation(info: ScrapedInformation): ScrapedInformation {
    // For now, just return the information as is
    // In the future, we can add validation logic here
    return info;
  }

  private generateProcessSteps(info: ScrapedInformation): ProcessStep[] {
    const steps: ProcessStep[] = [];
    let stepNumber = 1;

    // Add document gathering steps
    if (info.requirements.length > 0) {
      steps.push({
        id: `step-${stepNumber++}`,
        title: 'Gather Required Documents',
        description: 'Collect all necessary documentation for your visa application:',
        substeps: info.requirements.map(req => ({
          title: req,
          status: StepStatus.NOT_STARTED
        })),
        timeframe: '2-4 weeks',
        status: StepStatus.NOT_STARTED,
        prerequisites: []
      });
    }

    // Add deadline-related steps
    if (info.deadlines.length > 0) {
      steps.push({
        id: `step-${stepNumber++}`,
        title: 'Meet Application Deadlines',
        description: 'Important dates and deadlines to remember:',
        substeps: info.deadlines.map(deadline => ({
          title: deadline,
          status: StepStatus.NOT_STARTED
        })),
        timeframe: 'Varies',
        status: StepStatus.NOT_STARTED,
        prerequisites: []
      });
    }

    // Add contact-related steps
    if (info.contacts.length > 0) {
      steps.push({
        id: `step-${stepNumber++}`,
        title: 'Contact Important Offices',
        description: 'Reach out to these offices for assistance:',
        substeps: info.contacts.map(contact => ({
          title: contact,
          status: StepStatus.NOT_STARTED
        })),
        timeframe: '1-2 weeks',
        status: StepStatus.NOT_STARTED,
        prerequisites: []
      });
    }

    // Add process steps
    if (info.processSteps.length > 0) {
      const processStepGroups = this.groupProcessSteps(info.processSteps);
      steps.push(...processStepGroups.map((group, index) => ({
        id: `step-${stepNumber++}`,
        title: `Process Step ${index + 1}`,
        description: group.description,
        substeps: group.substeps.map(step => ({
          title: step,
          status: StepStatus.NOT_STARTED
        })),
        timeframe: group.timeframe || 'Varies',
        status: StepStatus.NOT_STARTED,
        prerequisites: index > 0 ? [`step-${stepNumber - 2}`] : []
      })));
    }

    return steps;
  }

  private groupProcessSteps(steps: string[]): Array<{description: string, substeps: string[], timeframe?: string}> {
    // Group similar steps together
    const groups: Array<{description: string, substeps: string[], timeframe?: string}> = [];
    
    const documentGroup = steps.filter(s => s.includes('document') || s.includes('form'));
    if (documentGroup.length > 0) {
      groups.push({
        description: 'Document Preparation',
        substeps: documentGroup,
        timeframe: '2-3 weeks'
      });
    }

    const applicationGroup = steps.filter(s => s.includes('apply') || s.includes('submit'));
    if (applicationGroup.length > 0) {
      groups.push({
        description: 'Application Submission',
        substeps: applicationGroup,
        timeframe: '1-2 weeks'
      });
    }

    const interviewGroup = steps.filter(s => s.includes('interview') || s.includes('appointment'));
    if (interviewGroup.length > 0) {
      groups.push({
        description: 'Interview Process',
        substeps: interviewGroup,
        timeframe: '2-4 weeks'
      });
    }

    const arrivalGroup = steps.filter(s => s.includes('arrival') || s.includes('report'));
    if (arrivalGroup.length > 0) {
      groups.push({
        description: 'Arrival and Check-in',
        substeps: arrivalGroup,
        timeframe: '1-2 weeks'
      });
    }

    // Add remaining steps to a miscellaneous group
    const usedSteps = new Set([...documentGroup, ...applicationGroup, ...interviewGroup, ...arrivalGroup]);
    const remainingSteps = steps.filter(s => !usedSteps.has(s));
    if (remainingSteps.length > 0) {
      groups.push({
        description: 'Additional Steps',
        substeps: remainingSteps
      });
    }

    return groups;
  }

  public async gatherInformation(institution: string, program: string, visaType: string, state: string): Promise<ScrapedInformation> {
    const queries = this.generateSearchQueries(institution, program, visaType, state);
    const searchResults = await this.searchWeb(queries);
    const extractedInfo = this.extractInformation(searchResults);
    return this.validateInformation(extractedInfo);
  }

  public async generateRoadmap(institution: string, program: string, visaType: string, state: string): Promise<ProcessStep[]> {
    const info = await this.gatherInformation(institution, program, visaType, state);
    return this.generateProcessSteps(info);
  }
} 