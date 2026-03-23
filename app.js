const defaultProfile = {
  profileType: 'pro',
  firstName: 'Camille',
  lastName: 'Durand',
  company: 'Horizons Signature',
  jobTitle: 'Responsable production',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  cover:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  email: 'camille@horizons-signature.fr',
  phone: '+33 6 12 34 56 78',
  bio: 'Spécialiste des voyages sur mesure et de la production long-courrier pour les agences premium.',
  destination: '',
  specialties: '',
  services: '',
  languages: ''
};

const profile = { ...defaultProfile };

const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const editForm = document.querySelector('#edit-form');
const expertFields = document.querySelector('#expert-fields');
const expertPanel = document.querySelector('#expert-panel');

const profileNodes = {
  badge: document.querySelector('#profile-badge'),
  name: document.querySelector('#profile-name'),
  role: document.querySelector('#profile-role'),
  bio: document.querySelector('#profile-bio'),
  avatar: document.querySelector('#profile-avatar'),
  cover: document.querySelector('#profile-cover'),
  email: document.querySelector('#detail-email'),
  phone: document.querySelector('#detail-phone'),
  company: document.querySelector('#detail-company'),
  job: document.querySelector('#detail-job'),
  destination: document.querySelector('#detail-destination'),
  specialties: document.querySelector('#detail-specialties'),
  services: document.querySelector('#detail-services'),
  languages: document.querySelector('#detail-languages')
};

function syncEditForm() {
  Object.entries(profile).forEach(([key, value]) => {
    const input = editForm.elements.namedItem(key);
    if (input) input.value = value;
  });
}

function updateExpertVisibility(type) {
  const isExpert = type === 'expert';
  expertFields.hidden = !isExpert;
  expertPanel.hidden = !isExpert;
}

function renderProfile() {
  profileNodes.badge.textContent = profile.profileType === 'expert' ? 'Expert destination' : 'Pro du tourisme';
  profileNodes.name.textContent = `${profile.firstName} ${profile.lastName}`.trim();
  profileNodes.role.textContent = `${profile.jobTitle} · ${profile.company}`;
  profileNodes.bio.textContent = profile.bio;
  profileNodes.avatar.src = profile.avatar;
  profileNodes.cover.style.backgroundImage = `url('${profile.cover}')`;
  profileNodes.email.textContent = profile.email;
  profileNodes.phone.textContent = profile.phone;
  profileNodes.company.textContent = profile.company;
  profileNodes.job.textContent = profile.jobTitle;
  profileNodes.destination.textContent = profile.destination || 'Non renseignée';
  profileNodes.specialties.textContent = profile.specialties || 'Non renseignées';
  profileNodes.services.textContent = profile.services || 'Non renseignés';
  profileNodes.languages.textContent = profile.languages || 'Non renseignées';

  updateExpertVisibility(profile.profileType);
  syncEditForm();
}

function formDataToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

signupForm.addEventListener('change', (event) => {
  if (event.target.name === 'profileType') {
    updateExpertVisibility(event.target.value);
  }
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  Object.assign(profile, defaultProfile, formDataToObject(signupForm));

  if (profile.profileType !== 'expert') {
    profile.destination = '';
    profile.specialties = '';
    profile.services = '';
    profile.languages = '';
  }

  renderProfile();
  document.querySelector('#dashboard').scrollIntoView({ behavior: 'smooth' });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#dashboard').scrollIntoView({ behavior: 'smooth' });
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  Object.assign(profile, formDataToObject(editForm));
  renderProfile();
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((button) => button.classList.remove('is-active'));
    document.querySelectorAll('.panel').forEach((panel) => panel.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('is-active');
  });
});

document.querySelectorAll('.edit-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(`#${button.dataset.editTarget}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

renderProfile();
