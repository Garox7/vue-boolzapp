function createContacts() {
    const contacts = [
        {
            name: 'Michele',
            avatar: '_1',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent',
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                }
            ],
        },
        {
            name: 'Fabio',
            avatar: '_2',
            visible: true,
            messages: [
                {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: '_3',
            visible: true,
            messages: [
                {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Alessandro B.',
            avatar: '_4',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Alessandro L.',
            avatar: '_5',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Claudia',
            avatar: '_6',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent'
                }
            ],
        },
        {
            name: 'Federico',
            avatar: '_7',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Davide',
            avatar: '_8',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received'
                }
            ],
        }
    ]

    nameArray = [],
        console.log('lista contatti:', nameArray);

    contacts.forEach(contact => {
        nameArray.push(contact.name.toLocaleLowerCase());

        contact.messages.forEach(message => {
            message.show = false;
        });
    });

    return contacts;
}

new Vue({
    el: '#app-boolzapp',
    data: {
        contacts: createContacts(),
        currentChat: 0,
        newMessage: '',
        inputSearch: '',
        notFound: false,
        currentMessage: 0,
        contactStatus: ['ultimo accesso alle ', 'sta scrivendo...', 'Online'],
        statusIndex: 0,
        userTheme: "light-theme",
        themeSwitchShow: false,
    },

    mounted() {
        const initUserTheme = this.getTheme();
        this.setTheme(initUserTheme);
    },


    methods: {

        toggleTheme() {
            const activeTheme = localStorage.getItem("user-theme");
            if (activeTheme === "light-theme") {
                this.setTheme("dark-theme");
            } else {
                this.setTheme("light-theme");
            }
            this.themeSwitchShow = false;
        },

        getTheme() {
            return localStorage.getItem("user-theme");
        },

        setTheme(theme) {
            localStorage.setItem("user-theme", theme);
            this.userTheme = theme;
            document.documentElement.className = theme;
        },





        showChat(index) {
            this.currentChat = index;
        },

        setNewDate() {
            return luxon.DateTime.now().toFormat('dd/MM/y HH:mm:ss');
        },

        replyMessage() {
            const receiverIndex = this.currentChat;

            setTimeout(() => this.statusIndex = 2, 1000)
            setTimeout(() => this.statusIndex = 1, 2000)
            setTimeout(() =>
                this.contacts[receiverIndex].messages.push({
                    date: this.setNewDate(),
                    message: 'Ok',
                    status: 'received',
                    show: false,
                }), 4000)
            setTimeout(() => this.statusIndex = 2, 4001)
            setTimeout(() => this.statusIndex = 0, 5000)

            console.log('messaggio ricevuto'); //DEBUG
        },

        sendMessage() {
            if (this.newMessage.trim()) {
                this.contacts[this.currentChat].messages.push({
                    date: this.setNewDate(),
                    message: this.newMessage.trim(),
                    status: 'sent',
                    show: false,
                })

                this.newMessage = '';
                this.replyMessage()

                console.log('Messaggio inviato'); //DEBUG
            } else { }
        },

        searchContacts() {
            arrNameNotFound = [];
            console.log('non trovati:', arrNameNotFound);

            this.contacts.forEach((element, i) => {
                if (this.contacts[i].name.toLowerCase().includes(this.inputSearch.toLowerCase())) {
                    this.contacts[i].visible = true;

                    console.log('risultati della ricerca:', this.contacts[i].name); //DEBUG
                } else {
                    this.contacts[i].visible = false;
                    arrNameNotFound.push(this.contacts[i].name.toLowerCase());
                }
            });

            if (nameArray.length == arrNameNotFound.length) {
                this.notFound = true;

                console.log('la lista è vuota'); //DEBUG
            } else {
                this.notFound = false;
            }
        },

        showDropdown(i) {
            this.currentMessage = i;
            const keyShow = this.contacts[this.currentChat].messages[this.currentMessage];

            keyShow.show = !keyShow.show;
        },

        deleteMessage(i) {
            this.contacts[this.currentChat].messages.splice(i, 1);
        },

        showDropdownTheme() {
            this.themeSwitchShow = !this.themeSwitchShow;
        }
    },
});