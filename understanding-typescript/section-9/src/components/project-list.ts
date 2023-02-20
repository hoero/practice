import { Component } from './base-component.js';
import { Project, Status } from '../models/project.js';
import { Autobind } from '../decorators/autobind.js';
import { state } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';
import { DragTarget } from '../models/drag-drop.js';

export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
{
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
        if (
            event.dataTransfer &&
            event.dataTransfer.types[0] === 'text/plain'
        ) {
            event.preventDefault();
            const list = this.element.querySelector('ul')!;
            list.classList.add('droppable');
        }
    }

    @Autobind
    dropHandler(event: DragEvent) {
        const id = event.dataTransfer!.getData('text/plain');
        state.moveProject(
            id,
            this.type === 'active' ? Status.Active : Status.Finished
        );
    }

    @Autobind
    dragLeaveHandler(_: DragEvent) {
        const list = this.element.querySelector('ul')!;
        list.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        state.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === Status.Active;
                }
                return project.status === Status.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const id = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = id;
        this.element.querySelector('h2')!.textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const list = document.getElementById(
            `${this.type}-projects-list`
        )! as HTMLUListElement;
        list.innerHTML = '';
        for (const project of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, project);
        }
    }
}
