# syntax=docker/dockerfile:1

ARG VARIANT="20"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Install some generally useful tools
RUN apt-get update \
    && apt-get -y install --no-install-recommends \
    curl git sqlite3 entr source-highlight neovim build-essential procps file xclip
    
# brew
RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
    && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv) \
    && echo '[ -d /home/linuxbrew/.linuxbrew ] && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)' >> /etc/bash.bashrc \
    && brew install gcc yq

# Install SAP CAP SDK globally
USER node
RUN npm install -g @sap/cds-dk

# vi mode everywhere and nicer prompt KTHXBAI
RUN cat <<EOBASHRC >> /home/node/.bashrc
export EDITOR=vi
set -o vi
bind -x '"\C-l": clear'
EOBASHRC

RUN echo 'export PS1=${PS1/\$ /\\\\n$ }' >> /home/node/.bashrc
RUN echo 'alias cb="cd /workspaces/capb2b/"' >> /home/node/.bashrc
RUN echo 'alias v=nvim' >> /home/node/.bashrc
RUN echo 'alias uuid="node -e \"console.log(require('crypto').randomUUID())\""' >> /home/node/.bashrc

# Ready!
WORKDIR /home/node
