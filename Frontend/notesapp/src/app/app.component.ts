import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  notes: any[] = [];
  title = '';
  content = '';
  editId: string | null = null;
  url:string="https://notes-app-server-q9rc.onrender.com"
  ngOnInit(): void {
    this.fetchNotes();
  }

  async fetchNotes() {
    const res = await fetch(`${this.url}/notes`);
    this.notes = await res.json();
    console.log(this.notes);
  }

  async addNote() {
    if (!this.title || !this.content) return;

    const note = { title: this.title, content: this.content };

    if (this.editId) {
      // UPDATE existing note
      await fetch(`${this.url}/notes/${this.editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
    } else {
      // CREATE new note
      await fetch(`${this.url}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
    }

    this.title = '';
    this.content = '';
    this.editId = null;
    this.fetchNotes();
  }

  async deleteNote(id: string) {
    await fetch(`${this.url}/notes/${id}`, {
      method: 'DELETE',
    });
    this.fetchNotes();
  }

  editNote(note: any) {
    this.title = note.title;
    this.content = note.content;
    this.editId = note._id;
  }
}
